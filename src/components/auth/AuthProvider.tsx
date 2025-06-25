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
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Profile fetch error:", profileError);
          }

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
          try {
            const { data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();

            if (profileError) {
              console.error("Profile fetch error:", profileError);
            }

            setProfile(profileData);
          } catch (error) {
            console.error("Error fetching profile:", error);
            setProfile(null);
          }
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

    try {
      // Clear state immediately for better UX
      console.log("Clearing local state...");
      setUser(null);
      setProfile(null);

      // Call Supabase signOut
      console.log("Calling Supabase signOut...");
      const { error } = await supabase.auth.signOut({
        scope: "global",
      });

      if (error) {
        console.error("Supabase signOut error:", error);
        // Don't throw - continue with cleanup
      } else {
        console.log("Supabase signOut successful");
      }

      // Clear browser storage
      console.log("Clearing browser storage...");
      if (typeof window !== "undefined") {
        // Clear all localStorage
        localStorage.clear();

        // Clear all sessionStorage
        sessionStorage.clear();

        console.log("Storage cleared");
      }

      console.log("=== SIGN OUT COMPLETED ===");

      // Force page reload to ensure clean state
      if (typeof window !== "undefined") {
        console.log("Reloading page...");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign out error:", error);

      // Force cleanup even on error
      setUser(null);
      setProfile(null);

      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
      }
    } finally {
      setSigningOut(false);
    }
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
