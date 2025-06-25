"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface AuthContextProps {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const supabase = createClient();

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);

        if (profileError.code === "PGRST116") {
          console.log("Profile not found, creating new profile...");

          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();

          if (authUser) {
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert([
                {
                  id: authUser.id,
                  email: authUser.email,
                  full_name:
                    authUser.user_metadata?.full_name ||
                    authUser.user_metadata?.name ||
                    "User",
                  avatar_url:
                    authUser.user_metadata?.avatar_url ||
                    authUser.user_metadata?.picture,
                  role: "user",
                },
              ])
              .select()
              .single();

            if (createError) {
              console.error("Failed to create profile:", createError);
              return null;
            }

            return newProfile;
          }
        }
        return null;
      }

      return profileData;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
          setUser(null);
          setProfile(null);
          return;
        }

        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("AuthProvider: Error in getSession:", error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        console.log("User signed out - clearing state");
        setUser(null);
        setProfile(null);
        setSigningOut(false);
        setLoading(false);
        return;
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // ...existing code...

  const signOut = async () => {
    if (signingOut) {
      console.log("Already signing out, skipping...");
      return;
    }

    setSigningOut(true);

    try {
      // Clear state immediately
      setUser(null);
      setProfile(null);

      // Clear all storage with error handling
      if (typeof window !== "undefined") {
        try {
          // Clear localStorage
          const keys = Object.keys(localStorage);
          keys.forEach((key) => {
            if (key.startsWith("sb-") || key.includes("supabase")) {
              localStorage.removeItem(key);
            }
          });
          localStorage.clear();

          // Clear sessionStorage
          sessionStorage.clear();

          // Clear cookies if any
          document.cookie.split(";").forEach((c) => {
            const eqPos = c.indexOf("=");
            const name = eqPos > -1 ? c.substr(0, eqPos) : c;
            document.cookie =
              name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          });
        } catch (storageError) {
          console.error("Storage clear error:", storageError);
        }
      }

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut({
        scope: "global", // This ensures complete logout
      });

      if (error) {
        console.error("Supabase signout error:", error);
      }

      // Force redirect with cache busting
      if (typeof window !== "undefined") {
        // Clear any cached data
        if ("caches" in window) {
          caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name);
            });
          });
        }

        // Use replace to prevent back button issues
        window.location.replace("/?t=" + Date.now());
      }
    } catch (error) {
      console.error("Sign out error:", error);
      // Force redirect even on error
      if (typeof window !== "undefined") {
        window.location.replace("/?t=" + Date.now());
      }
    } finally {
      // Delay to ensure cleanup
      setTimeout(() => {
        setSigningOut(false);
      }, 2000);
    }
  };

  // ...existing code...

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading: loading || signingOut,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
