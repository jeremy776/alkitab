"use client";

import { useState } from "react";
import Image from "next/image";
import DailyVerse from "@/components/dailyVerse";

export default function TurboBuilderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English");

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail("");
    }
  };

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              S
            </div> */}
            <Image
              src={"/logo.png"}
              className="rounded-xl"
              width={36}
              alt="SelaVibes"
              height={36}
            />
            <span className="text-gray-900 font-semibold text-lg tracking-tight">
              SelaVibes
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="hover:text-indigo-600 transition"
              >
                Features
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("daily-verse")}
                className="hover:text-indigo-600 transition"
              >
                Ayat Harian
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("templates")}
                className="hover:text-indigo-600 transition"
              >
                Templates
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("learn")}
                className="hover:text-indigo-600 transition"
              >
                Resources
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-indigo-600 transition"
              >
                About
              </button>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-gray-600 hover:text-indigo-600 transition">
              Log in
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition shadow">
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 text-2xl focus:outline-none"
          >
            <span className={isMenuOpen ? "hidden" : "block"}>☰</span>
            <span className={isMenuOpen ? "block" : "hidden"}>✕</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden mt-4 px-4 pt-4 pb-6 border-t border-gray-200 bg-white/90 backdrop-blur-md rounded-md space-y-3 text-sm font-medium text-gray-700 transition-all duration-300 ${
            isMenuOpen ? "block opacity-100" : "hidden opacity-0"
          }`}
        >
          <button
            onClick={() => scrollToSection("features")}
            className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("daily-verse")}
            className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
          >
            Ayat Harian
          </button>
          <button
            onClick={() => scrollToSection("templates")}
            className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
          >
            Templates
          </button>
          <button
            onClick={() => scrollToSection("learn")}
            className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
          >
            Resources
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
          >
            About
          </button>
          <hr className="my-2" />
          <button className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded">
            Log in
          </button>
          <button className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-lg font-medium transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white py-20 px-6 text-gray-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
              ✨ New in 2025
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Waktunya Sela.
              <br />
              Vibes-nya Kamu.
            </h1>

            <p className="text-lg text-gray-600 mb-6 max-w-xl">
              SelaVibes bantu kamu connect sama Tuhan lewat lagu, ayat, dan fun
              facts yang relatable banget.
            </p>

            <ul className="text-sm text-gray-700 mb-8 space-y-2">
              <li className="flex items-center gap-2">
                ✅ Lagu-lagu rohani keren siap diputar kapan aja
              </li>
              <li className="flex items-center gap-2">
                ✅ Ayat harian dengan vibe kekinian
              </li>
              <li className="flex items-center gap-2">
                ✅ Fun trivia & quotes yang nancep di hati
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                📖 Ayo Teduh Yuk
              </button>
              {/* <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                📺 Watch Demo
              </button> */}
            </div>
          </div>

          {/* Right: Image with Overlay */}
          <div className="relative hidden lg:block">
            <Image
              src="/hero.png"
              alt="Builder preview"
              width={600}
              height={400}
              className="rounded-xl"
              priority
            />

            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow">
              SaTe Bareng
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl text-gray-700 font-bold mb-4">
            📖 Ayat Harian yang Relatable
          </h2>
          <p className="text-gray-600 mb-12">
            Setiap hari kamu bakal dapet satu ayat yang nancep di hati—gak
            terlalu panjang, tapi kena banget.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                🙏 Doa Harian Biar Gak Lupa Ngobrol Sama Tuhan
              </h3>
              <p className="text-sm text-gray-600">
                Doa singkat yang bisa kamu baca atau dengerin kapan aja. Cocok
                buat nemenin pagi, istirahat, atau sebelum tidur.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                🎵 Playlist Rohani Bikin Hati Adem
              </h3>
              <p className="text-sm text-gray-600">
                Kumpulan lagu-lagu rohani kekinian yang bisa kamu putar biar
                suasana hati makin tenang dan positif.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                🧠 Tes Kepribadian Alkitabiah
              </h3>
              <p className="text-sm text-gray-600">
                Yuk kenalan sama dirimu dari sudut pandang Alkitab—fun dan
                insightful banget!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                💬 Komunitas yang Saling Menguatkan
              </h3>
              <p className="text-sm text-gray-600">
                (Coming Soon) Tempat buat saling berbagi berkat, cerita, dan
                doa. Karena iman itu makin kuat kalau jalan bareng 🙌
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <DailyVerse />

      {/* Placeholder sections for navigation */}
      <div id="templates" className="h-20"></div>
      <div id="learn" className="h-20"></div>
      <div id="about" className="h-20"></div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-2">SelaVibes</h2>
            <p className="text-gray-600 text-sm mb-6">
              Teman digital buat hati yang lagi butuh dikuatin. Dari ayat sampai
              lagu rohani, semua ada di sini 🌿
            </p>
            {/* <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 mb-4"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form> */}
            {/* <p className="text-gray-400 text-xs">
              No spam. Unsubscribe anytime.
            </p> */}
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-gray-800 font-semibold mb-4 text-sm">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button className="hover:text-indigo-600">Features</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Templates</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Integrations</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Pricing</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-4 text-sm">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button className="hover:text-indigo-600">About</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Careers</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Team</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Contact</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 font-semibold mb-4 text-sm">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button className="hover:text-indigo-600">Blog</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Docs</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Community</button>
              </li>
              <li>
                <button className="hover:text-indigo-600">Support</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-12 pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 LazyPeople Org. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-indigo-600">Privacy Policy</button>
            <button className="hover:text-indigo-600">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
