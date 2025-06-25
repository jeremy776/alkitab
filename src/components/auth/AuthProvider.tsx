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

      // Handle sign out event
      if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        setLoading(false);
        setSigningOut(false); // Reset signing out state
        return;
      }

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

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const signOut = async () => {
    if (signingOut) return;

    try {
      setSigningOut(true);
      console.log("Starting sign out process...");

      const timeoutId = setTimeout(() => {
        console.log("Sign out timeout - forcing redirect");
        setSigningOut(false);
        setUser(null);
        setProfile(null);
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }, 5000); // 5 second timeout

      setUser(null);
      setProfile(null);

      console.log("Calling supabase.auth.signOut...");
      const { error } = await supabase.auth.signOut();

      clearTimeout(timeoutId); // Clear timeout if successful

      if (error) {
        console.error("Sign out error:", error);
      }

      console.log("Sign out API call completed");

      // Clear storage
      if (typeof window !== "undefined") {
        console.log("Clearing storage...");

        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("supabase") || key.startsWith("sb-"))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));

        // Clear sessionStorage
        const sessionKeysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && (key.startsWith("supabase") || key.startsWith("sb-"))) {
            sessionKeysToRemove.push(key);
          }
        }
        sessionKeysToRemove.forEach((key) => sessionStorage.removeItem(key));

        console.log("Redirecting to home...");

        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
    } catch (error) {
      console.error("Error during sign out:", error);

      setUser(null);
      setProfile(null);
      setSigningOut(false);

      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
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
