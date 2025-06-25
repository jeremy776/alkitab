"use client";

import { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);

    // Set timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, []);

  // Reset loading timeout when loading state changes
  useEffect(() => {
    if (!loading) {
      setLoadingTimeout(false);
    }
  }, [loading]);

  const isAdmin = profile?.role === "admin";
  const navItems = isAdmin ? adminNavItems : publicNavItems;
  const mobileNavItems = isAdmin ? mobileAdminNavItems : mobilePublicNavItems;

  const handleSignOut = async () => {
    try {
      setIsProfileOpen(false);
      setIsMenuOpen(false);

      // Show loading state
      const loadingToast = document.createElement("div");
      loadingToast.className =
        "fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg z-50";
      loadingToast.textContent = "Signing out...";
      document.body.appendChild(loadingToast);

      await signOut();

      // Remove loading toast
      document.body.removeChild(loadingToast);
    } catch (error) {
      console.error("Error signing out:", error);
      // Force redirect on error
      window.location.replace("/?t=" + Date.now());
    }
  };
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        !target.closest(".profile-dropdown") &&
        !target.closest(".profile-button")
      ) {
        setIsProfileOpen(false);
      }
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show loading state with better handling
  if (!mounted || (loading && !user)) {
    return (
      <nav className="bg-white/80 backdrop-blur-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
          <div className="animate-pulse flex space-x-4">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </nav>
    );
  }

  // Display fallback name if profile is loading but user exists
  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "User";
  const displayEmail = profile?.email || user?.email || "";
  const displayAvatar =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "/default-avatar.png";

  return (
    <nav className="bg-white/80 backdrop-blur-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-indigo-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-button flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700 max-w-20 truncate">
                    {displayName.split(" ")[0]}
                  </span>
                  {isAdmin && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Admin
                    </span>
                  )}
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
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
                  <>
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-[60] animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <img
                            src={displayAvatar}
                            alt={displayName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {displayName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {displayEmail}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                              isAdmin
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {isAdmin ? "👑 Admin" : "👤 User"}
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            href="/dashboard"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-indigo-600"
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

                        <hr className="my-1" />

                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200"
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
                  </>
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
          className="mobile-toggle md:hidden text-gray-700 text-2xl focus:outline-none p-2"
        >
          <span
            className={`block transition-all duration-200 ${
              isMenuOpen ? "rotate-45 scale-0" : "rotate-0 scale-100"
            }`}
          >
            ☰
          </span>
          <span
            className={`block transition-all duration-200 ${
              isMenuOpen ? "rotate-0 scale-100" : "-rotate-45 scale-0"
            }`}
          >
            ✕
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu - IMPROVED */}
      <div
        className={`mobile-menu md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 border-t border-gray-200 bg-white/95 backdrop-blur-md rounded-lg mx-2 space-y-3 text-sm font-medium text-gray-700">
          {/* Navigation Items */}
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}

          <hr className="my-3" />

          {/* Auth Section for Mobile */}
          {user ? (
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {displayEmail}
                  </p>
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
                  className="flex items-center w-full px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Dashboard
                </Link>
              )}

              {/* Sign Out for Mobile - PASTIKAN SELALU ADA */}
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
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
          ) : (
            <div className="px-3">
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
