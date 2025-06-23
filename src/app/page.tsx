"use client";

import DailyVerse from "@/components/dailyVerse";
import ChristianMusicSection from "@/components/christianMusic";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import FeaturesSection from "@/components/features";
import Footer from "@/components/footer";

export default function TurboBuilderPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Header */}
      <Header />
      {/* Features Section */}
      <FeaturesSection />
      {/* Daily Verse Section */}
      <DailyVerse />
      {/* Christian Music Section */}
      <ChristianMusicSection />
      {/* Footer */}
      <Footer />
    </div>
  );
}
