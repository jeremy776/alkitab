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

  // Helper function to fetch profile
  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);

        // If profile doesn't exist, create one from user metadata
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

            console.log("Profile created successfully:", newProfile);
            return newProfile;
          }
        }
        return null;
      }

      console.log("Profile fetched successfully:", profileData);
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
      console.log("Auth state change:", event, session?.user?.id);

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

  const signOut = async () => {
    if (signingOut) {
      console.log("Already signing out, skipping...");
      return;
    }

    console.log("=== SIGN OUT STARTED ===");
    setSigningOut(true);

    const forceRedirectTimer = setTimeout(() => {
      console.log("Sign out taking too long, forcing redirect...");
      setUser(null);
      setProfile(null);
      setSigningOut(false);

      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      }
    }, 3000); // 3 second timeout

    try {
      console.log("Clearing local state...");
      setUser(null);
      setProfile(null);

      console.log("Attempting sign out...");

      const signOutPromise = supabase.auth.signOut();

      const globalSignOutPromise = supabase.auth.signOut({ scope: "global" });

      // Race between the two methods with timeout
      const signOutResult = await Promise.race([
        signOutPromise,
        globalSignOutPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Sign out timeout")), 2000)
        ),
      ]);

      console.log("Sign out successful:", signOutResult);
      clearTimeout(forceRedirectTimer);
    } catch (error) {
      console.error("Sign out error:", error);
      console.error(error);
      clearTimeout(forceRedirectTimer);
    }

    // Always clear storage and redirect regardless of API success
    try {
      if (typeof window !== "undefined") {
        console.log("Clearing storage...");

        // Clear specific Supabase keys first
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("sb-") || key.includes("supabase")) {
            localStorage.removeItem(key);
          }
        });

        Object.keys(sessionStorage).forEach((key) => {
          if (key.startsWith("sb-") || key.includes("supabase")) {
            sessionStorage.removeItem(key);
          }
        });

        console.log("Storage cleared, redirecting...");

        // Force immediate redirect
        window.location.replace("/");
      }
    } catch (storageError) {
      console.error("Storage clear error:", storageError);
      // Still try to redirect even if storage clear fails
      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
    }

    setSigningOut(false);
  };

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
