"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect, useRef } from "react";
import type { Database } from "@/lib/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type DailyVerse = Database["public"]["Tables"]["daily_verses"]["Row"];
type DailyPrayer = Database["public"]["Tables"]["daily_prayers"]["Row"];

interface Props {
  initialVerses: DailyVerse[];
  initialPrayers: DailyPrayer[];
  initialUsers: Profile[];
  user: User;
  profile: Profile;
}

// Stats Cards Component
function StatsCard({
  title,
  value,
  icon,
  change,
  changeType,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 flex items-center ${
                changeType === "increase"
                  ? "text-green-600"
                  : changeType === "decrease"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {changeType === "increase" && (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {changeType === "decrease" && (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg">{icon}</div>
      </div>
    </div>
  );
}

// Custom Select Component
// Custom Select Component - FIXED VERSION
function CustomSelect({
  value,
  onChange,
  options,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; color?: string }[];
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-50"
            : "hover:border-gray-400"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Action Button Component
function ActionButton({
  onClick,
  variant = "secondary",
  size = "sm",
  disabled = false,
  children,
}: {
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const baseClasses = `font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
  };

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    danger: "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

// Modal Component - FIXED VERSION
// Modal Component - BLUR BACKGROUND VERSION
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop dengan blur effect */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div
          className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]} sm:p-6`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardClient({
  initialVerses,
  initialPrayers,
  initialUsers,
  user,
  profile,
}: Props) {
  const [verses, setVerses] = useState(initialVerses);
  const [prayers, setPrayers] = useState(initialPrayers);
  const [users, setUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<DailyVerse | null>(null);
  const [selectedPrayer, setSelectedPrayer] = useState<DailyPrayer | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState<{
    type: "verse" | "prayer";
    id: string;
    title: string;
  } | null>(null);
  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [versesRes, prayersRes, usersRes] = await Promise.all([
        supabase
          .from("daily_verses")
          .select("*")
          .order("date", { ascending: false })
          .limit(50),
        supabase
          .from("daily_prayers")
          .select("*")
          .order("date", { ascending: false })
          .limit(50),
        supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      setVerses(versesRes.data || []);
      setPrayers(prayersRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: "admin" | "user") => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
      await fetchData();
    }
  };

  const deleteVerse = async (verseId: string) => {
    try {
      const { error } = await supabase
        .from("daily_verses")
        .delete()
        .eq("id", verseId);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error("Error deleting verse:", error);
    }
  };

  const deletePrayer = async (prayerId: string) => {
    try {
      const { error } = await supabase
        .from("daily_prayers")
        .delete()
        .eq("id", prayerId);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error("Error deleting prayer:", error);
    }
  };

  const refreshContent = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetch("/api/daily-verse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ forceRefresh: true }),
        }),
        fetch("/api/daily-prayer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ forceRefresh: true }),
        }),
      ]);

      await fetchData();
    } catch (error) {
      console.error("Error refreshing content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    if (deleteModal.type === "verse") {
      await deleteVerse(deleteModal.id);
    } else {
      await deletePrayer(deleteModal.id);
    }

    setDeleteModal(null);
  };

  // Calculate stats
  const todayVerse = verses.find(
    (v) => v.date === new Date().toISOString().split("T")[0]
  );
  const todayPrayer = prayers.find(
    (p) => p.date === new Date().toISOString().split("T")[0]
  );
  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "verses", name: "Verses", icon: "📖" },
    { id: "prayers", name: "Prayers", icon: "🙏" },
    { id: "users", name: "Users", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {profile.full_name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ActionButton
                onClick={refreshContent}
                variant="primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Refreshing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh Content
                  </div>
                )}
              </ActionButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Verses"
                value={verses.length}
                icon={
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                }
                change="+12 this month"
                changeType="increase"
              />
              <StatsCard
                title="Total Prayers"
                value={prayers.length}
                icon={
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                }
                change="+8 this month"
                changeType="increase"
              />
              <StatsCard
                title="Total Users"
                value={users.length}
                icon={
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                }
                change={`${adminCount} admins`}
                changeType="neutral"
              />
              <StatsCard
                title="Today's Content"
                value={todayVerse && todayPrayer ? "✅ Ready" : "⚠️ Missing"}
                icon={
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
            </div>

            {/* Today's Content Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Verse */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Today's Verse
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                {todayVerse ? (
                  <div className="space-y-3">
                    <p className="font-medium text-indigo-700">
                      {todayVerse.reference}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {todayVerse.text}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      {todayVerse.reflection}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <p>No verse for today</p>
                  </div>
                )}
              </div>

              {/* Today's Prayer */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Today's Prayer
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                {todayPrayer ? (
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      {todayPrayer.prayer}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <p>No prayer for today</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Verses Tab */}
        {activeTab === "verses" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Daily Verses
                </h2>
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                  {verses.length} verses
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Text
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {verses.map((verse) => (
                    <tr key={verse.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(verse.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-indigo-600">
                          {verse.reference}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 max-w-md truncate">
                          {verse.text}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <ActionButton
                          onClick={() => setSelectedVerse(verse)}
                          variant="secondary"
                        >
                          View
                        </ActionButton>
                        <ActionButton
                          onClick={() =>
                            setDeleteModal({
                              type: "verse",
                              id: verse.id,
                              title: verse.reference,
                            })
                          }
                          variant="danger"
                        >
                          Delete
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prayers Tab */}
        {activeTab === "prayers" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Daily Prayers
                </h2>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {prayers.length} prayers
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prayer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prayers.map((prayer) => (
                    <tr key={prayer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(prayer.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 max-w-md truncate">
                          {prayer.prayer}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <ActionButton
                          onClick={() => setSelectedPrayer(prayer)}
                          variant="secondary"
                        >
                          View
                        </ActionButton>
                        <ActionButton
                          onClick={() =>
                            setDeleteModal({
                              type: "prayer",
                              id: prayer.id,
                              title: "Prayer",
                            })
                          }
                          variant="danger"
                        >
                          Delete
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Users Management
                </h2>
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                    {adminCount} admins
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {userCount} users
                  </span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userData) => (
                    <tr key={userData.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                            src={userData.avatar_url || "/default-avatar.png"}
                            alt={userData.full_name || "User"}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {userData.full_name || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {userData.id === user.id && "(You)"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {userData.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            userData.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {userData.role === "admin" ? "👑 Admin" : "👤 User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(userData.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <CustomSelect
                          value={userData.role}
                          onChange={(newRole) => {
                            console.log(newRole);
                            updateUserRole(
                              userData.id,
                              newRole as "admin" | "user"
                            );
                          }}
                          disabled={userData.id === user.id}
                          options={[
                            {
                              value: "user",
                              label: "👤 User",
                              color: "text-green-700",
                            },
                            {
                              value: "admin",
                              label: "👑 Admin",
                              color: "text-red-700",
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Verse Detail Modal */}
      <Modal
        isOpen={!!selectedVerse}
        onClose={() => setSelectedVerse(null)}
        title={selectedVerse?.reference || ""}
        size="lg"
      >
        {selectedVerse && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {new Date(selectedVerse.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verse Text
              </label>
              <p className="text-sm text-gray-900 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                {selectedVerse.text}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Reflection
              </label>
              <p className="text-sm text-gray-900 leading-relaxed bg-green-50 p-4 rounded-lg">
                {selectedVerse.reflection}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long Reflection
              </label>
              <div className="text-sm text-gray-900 leading-relaxed bg-yellow-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                {selectedVerse.long_reflection
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Prayer Detail Modal */}
      <Modal
        isOpen={!!selectedPrayer}
        onClose={() => setSelectedPrayer(null)}
        title="Daily Prayer"
        size="md"
      >
        {selectedPrayer && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {new Date(selectedPrayer.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prayer
              </label>
              <p className="text-sm text-gray-900 leading-relaxed bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                {selectedPrayer.prayer}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Confirm Delete"
        size="sm"
      >
        {deleteModal && (
          <div className="space-y-4">
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>
                <span className="font-medium">Warning!</span> This action cannot
                be undone.
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this {deleteModal.type}?
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-800">
                {deleteModal.title}
              </p>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <ActionButton
                onClick={() => setDeleteModal(null)}
                variant="secondary"
              >
                Cancel
              </ActionButton>
              <ActionButton onClick={handleDelete} variant="danger">
                Delete {deleteModal.type}
              </ActionButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
