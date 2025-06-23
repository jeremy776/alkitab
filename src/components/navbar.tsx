"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/refleksi/hari-ini", label: "Ayat Harian" },
  { href: "/quiz", label: "Quiz" },
];

const mobileNavItems = [
  { href: "/refleksi/hari-ini", label: "Ayat Harian" },
  { href: "/features", label: "Features" },
  { href: "/templates", label: "Templates" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
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
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-indigo-600 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

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
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
          >
            {item.label}
          </Link>
        ))}
        
        <hr className="my-2" />
        
        <Link 
          href="/login"
          className="block w-full text-left px-2 py-2 hover:bg-gray-100 rounded"
        >
          Log in
        </Link>
        <Link 
          href="/get-started"
          className="block bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-lg font-medium transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}