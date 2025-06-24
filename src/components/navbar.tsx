"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import LoginButton from "@/components/auth/loginButton";

const publicNavItems = [
  { href: "/", label: "Home" },
  { href: "/refleksi/hari-ini", label: "Ayat Harian" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about-us", label: "About" },
  { href: "/teams", label: "Teams" },
];

const adminNavItems = [
  { href: "/", label: "Home" },
  { href: "/refleksi/hari-ini", label: "Ayat Harian" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about-us", label: "About" },
  { href: "/teams", label: "Teams" },
];

const mobilePublicNavItems = [
  { href: "/", label: "Home" },
  { href: "/refleksi/hari-ini", label: "Ayat Harian" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about-us", label: "About" },
  { href: "/teams", label: "Teams" },
];

const mobileAdminNavItems = [
  { href: "/", label: "Home" },
  { href: "/refleksi/hari-ini", label: "Ayat Harian" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about-us", label: "About" },
  { href: "/teams", label: "Teams" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  const isAdmin = profile?.role === "admin";
  const navItems = isAdmin ? adminNavItems : publicNavItems;
  const mobileNavItems = isAdmin ? mobileAdminNavItems : mobilePublicNavItems;

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      // Redirect to home page after sign out
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
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

          {/* Loading indicator */}
          <div className="animate-pulse flex space-x-4">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </nav>
    );
  }

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
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
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

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors"
                >
                  <img
                    src={profile?.avatar_url || "/default-avatar.png"}
                    alt={profile?.full_name || "User"}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {profile?.full_name?.split(" ")[0] || "User"}
                  </span>
                  {isAdmin && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Admin
                    </span>
                  )}
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {profile?.full_name}
                      </p>
                      <p className="text-xs text-gray-500">{profile?.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            isAdmin
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {profile?.role}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      {isAdmin && (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          Dashboard
                        </Link>
                      )}

                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
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
        {/* Navigation Items */}
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

        <hr className="my-3" />

        {/* Auth Section for Mobile */}
        {user ? (
          <div className="space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-2 py-2">
              <img
                src={profile?.avatar_url || "/default-avatar.png"}
                alt={profile?.full_name || "User"}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.full_name}
                </p>
                <p className="text-xs text-gray-500">{profile?.email}</p>
              </div>
              {isAdmin && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                  Admin
                </span>
              )}
            </div>

            {/* Admin Dashboard for Mobile */}
            {isAdmin && (
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center w-full px-2 py-2 text-indigo-600 hover:bg-indigo-50 rounded"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Dashboard
              </Link>
            )}

            {/* Sign Out for Mobile */}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-2 py-2 text-red-600 hover:bg-red-50 rounded"
            >
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="px-2">
            <LoginButton />
          </div>
        )}
      </div>

      {/* Overlay for profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </nav>
  );
}
