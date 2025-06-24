import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // Fetch initial data
  const [versesRes, prayersRes, usersRes] = await Promise.all([
    supabase
      .from("daily_verses")
      .select("*")
      .order("date", { ascending: false })
      .limit(30),
    supabase
      .from("daily_prayers")
      .select("*")
      .order("date", { ascending: false })
      .limit(30),
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <>
      <Navbar />
      <DashboardClient
        initialVerses={versesRes.data || []}
        initialPrayers={prayersRes.data || []}
        initialUsers={usersRes.data || []}
        user={session.user}
        profile={profile}
      />
      <Footer />
    </>
  );
}
