"use client";

import { useState } from "react";
import Image from "next/image";

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
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
              T
            </div>
            <span className="text-gray-900 font-semibold text-lg tracking-tight">
              TurboBuilder
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
              Build a Website in Minutes
              <br />
              Without Writing Code
            </h1>

            <p className="text-lg text-gray-600 mb-6 max-w-xl">
              Choose from dozens of professionally designed sections to create
              beautiful, responsive landing pages — all in your browser.
            </p>

            <ul className="text-sm text-gray-700 mb-8 space-y-2">
              <li className="flex items-center gap-2">
                ✅ Drag & drop live editor with real-time preview
              </li>
              <li className="flex items-center gap-2">
                ✅ Export HTML with 1 click — no lock-in
              </li>
              <li className="flex items-center gap-2">
                ✅ Built-in Tailwind CSS support for developers
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                🚀 Start Building
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                📺 Watch Demo
              </button>
            </div>
          </div>

          {/* Right: Image with Overlay */}
          <div className="relative hidden lg:block">
            {/* <Image
              src="https://placehold.co/600x400?text=Preview+Image"
              alt="Builder preview"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
              priority
            /> */}

            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow">
              Live Preview
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built for Speed and Flexibility
          </h2>
          <p className="text-gray-600 mb-12">
            Powerful building blocks to launch faster, look better, and iterate
            quicker.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                Easy to Customize
              </h3>
              <p className="text-sm text-gray-600">
                Change colors, layout, or content without touching a single line
                of code.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                Responsive by Default
              </h3>
              <p className="text-sm text-gray-600">
                Each section is optimized for all devices out of the box.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                SEO-Friendly
              </h3>
              <p className="text-sm text-gray-600">
                Clean semantic HTML helps you rank higher on search engines.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-indigo-600 font-semibold mb-2">
                Fast Loading
              </h3>
              <p className="text-sm text-gray-600">
                No heavy libraries. Optimized for performance and speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections for navigation */}
      <div id="templates" className="h-20"></div>
      <div id="learn" className="h-20"></div>
      <div id="about" className="h-20"></div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-2">YourBrand</h2>
            <p className="text-gray-600 text-sm mb-6">
              Join 10,000+ creators using our components to build better
              websites — faster.
            </p>
            <form
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
            </form>
            <p className="text-gray-400 text-xs">
              No spam. Unsubscribe anytime.
            </p>
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
          <p>&copy; 2025 YourBrand Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-indigo-600">Privacy Policy</button>
            <button className="hover:text-indigo-600">Terms of Service</button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
            >
              <option>English</option>
              <option>Bahasa Indonesia</option>
              <option>Français</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}
