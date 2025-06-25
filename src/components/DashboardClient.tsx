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

// Stats Cards Component - Mobile Optimized
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
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            {value}
          </p>
          {change && (
            <p
              className={`text-xs sm:text-sm mt-1 flex items-center ${
                changeType === "increase"
                  ? "text-green-600"
                  : changeType === "decrease"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {changeType === "increase" && (
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
              <span className="truncate">{change}</span>
            </p>
          )}
        </div>
        <div className="p-2 sm:p-3 bg-indigo-50 rounded-lg flex-shrink-0 ml-3">
          <div className="w-5 h-5 sm:w-6 sm:h-6">{icon}</div>
        </div>
      </div>
    </div>
  );
}

// Custom Select Component - Mobile Optimized
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
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none cursor-pointer ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-50"
            : "hover:border-gray-400"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.375rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.25em 1.25em",
          paddingRight: "2rem",
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

// Action Button Component - Mobile Optimized
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
    sm: "px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm",
    md: "px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base",
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

// Modal Component - Mobile Optimized
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
    sm: "max-w-sm sm:max-w-md",
    md: "max-w-md sm:max-w-lg",
    lg: "max-w-lg sm:max-w-2xl",
    xl: "max-w-xl sm:max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
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
            <h3 className="text-base sm:text-lg font-semibold leading-6 text-gray-900 pr-4">
              {title}
            </h3>
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex-shrink-0"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
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
          <div className="mt-3 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Table Component
function MobileTable({
  headers,
  data,
  renderRow,
}: {
  headers: string[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
}) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4 p-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            {renderRow(item, index)}
          </div>
        ))}
      </div>
    </>
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

  // ... keep existing functions (fetchData, updateUserRole, etc.) ...
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
      {/* Header - Mobile Optimized */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Welcome back, {profile.full_name?.split(" ")[0]}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ActionButton
                onClick={refreshContent}
                variant="primary"
                disabled={loading}
                size="md"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Refreshing...</span>
                    <span className="sm:hidden">...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
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
                    <span className="hidden sm:inline">Refresh Content</span>
                    <span className="sm:hidden">Refresh</span>
                  </div>
                )}
              </ActionButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Tabs - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex overflow-x-auto bg-gray-100 rounded-xl p-1 gap-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden xs:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Cards - Mobile Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <StatsCard
                title="Total Verses"
                value={verses.length}
                icon={
                  <svg
                    className="w-full h-full text-indigo-600"
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
                    className="w-full h-full text-indigo-600"
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
                    className="w-full h-full text-indigo-600"
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
                    className="w-full h-full text-indigo-600"
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

            {/* Today's Content Preview - Mobile Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Today's Verse */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Today's Verse
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                {todayVerse ? (
                  <div className="space-y-3">
                    <p className="font-medium text-indigo-700 text-sm sm:text-base">
                      {todayVerse.reference}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {todayVerse.text}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 italic">
                      {todayVerse.reflection}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <svg
                      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300"
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
                    <p className="text-sm">No verse for today</p>
                  </div>
                )}
              </div>

              {/* Today's Prayer */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Today's Prayer
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                {todayPrayer ? (
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {todayPrayer.prayer}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500">
                    <svg
                      className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300"
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
                    <p className="text-sm">No prayer for today</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Verses Tab */}
        {activeTab === "verses" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Daily Verses
                </h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
                  {verses.length} verses
                </span>
              </div>
            </div>

            <MobileTable
              headers={["Date", "Reference", "Text", "Actions"]}
              data={verses}
              renderRow={(verse, index) => (
                <>
                  {/* Desktop Row */}
                  <tr
                    key={verse.id}
                    className="hidden sm:table-row hover:bg-gray-50"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(verse.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-indigo-600">
                        {verse.reference}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-sm text-gray-900 max-w-md truncate">
                        {verse.text}
                      </p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
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

                  {/* Mobile Card */}
                  <div key={verse.id} className="sm:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-indigo-600 text-sm">
                          {verse.reference}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(verse.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {verse.text}
                    </p>
                    <div className="flex gap-2">
                      <ActionButton
                        onClick={() => setSelectedVerse(verse)}
                        variant="secondary"
                        size="sm"
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
                        size="sm"
                      >
                        Delete
                      </ActionButton>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        )}

        {/* Prayers Tab */}
        {activeTab === "prayers" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Daily Prayers
                </h2>
                <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
                  {prayers.length} prayers
                </span>
              </div>
            </div>

            <MobileTable
              headers={["Date", "Prayer", "Actions"]}
              data={prayers}
              renderRow={(prayer, index) => (
                <>
                  {/* Desktop Row */}
                  <tr
                    key={prayer.id}
                    className="hidden sm:table-row hover:bg-gray-50"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(prayer.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <p className="text-sm text-gray-900 max-w-md truncate">
                        {prayer.prayer}
                      </p>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
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

                  {/* Mobile Card */}
                  <div key={prayer.id} className="sm:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <p className="text-xs text-gray-500">
                        {new Date(prayer.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {prayer.prayer}
                    </p>
                    <div className="flex gap-2">
                      <ActionButton
                        onClick={() => setSelectedPrayer(prayer)}
                        variant="secondary"
                        size="sm"
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
                        size="sm"
                      >
                        Delete
                      </ActionButton>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Users Management
                </h2>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
                    {adminCount} admins
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
                    {userCount} users
                  </span>
                </div>
              </div>
            </div>

            <MobileTable
              headers={["User", "Email", "Role", "Joined", "Actions"]}
              data={users}
              renderRow={(userData, index) => (
                <>
                  {/* Desktop Row */}
                  <tr
                    key={userData.id}
                    className="hidden sm:table-row hover:bg-gray-50"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-gray-200"
                          src={
                            userData.avatar_url ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(userData.full_name || "User") +
                              "&background=6366f1&color=ffffff"
                          }
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
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {userData.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
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
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <CustomSelect
                        value={userData.role}
                        onChange={(newRole) => {
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

                  {/* Mobile Card  */}
                  <div key={userData.id} className="sm:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                          src={
                            userData.avatar_url ||
                            "https://ui-avatars.com/api/?name=" +
                              encodeURIComponent(userData.full_name || "User") +
                              "&background=6366f1&color=ffffff"
                          }
                          alt={userData.full_name || "User"}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {userData.full_name || "Unknown User"}
                            {userData.id === user.id && " (You)"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {userData.email}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          userData.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {userData.role === "admin" ? "👑" : "👤"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Joined{" "}
                        {new Date(userData.created_at).toLocaleDateString()}
                      </span>
                      <div className="w-24">
                        <CustomSelect
                          value={userData.role}
                          onChange={(newRole) => {
                            updateUserRole(
                              userData.id,
                              newRole as "admin" | "user"
                            );
                          }}
                          disabled={userData.id === user.id}
                          options={[
                            {
                              value: "user",
                              label: "User",
                              color: "text-green-700",
                            },
                            {
                              value: "admin",
                              label: "Admin",
                              color: "text-red-700",
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        )}
      </div>

      {/* Modals - Keep existing modals but they're already responsive */}
      {/* Verse Detail Modal */}
      <Modal
        isOpen={!!selectedVerse}
        onClose={() => setSelectedVerse(null)}
        title={selectedVerse?.reference || ""}
        size="lg"
      >
        {selectedVerse && (
          <div className="space-y-4 sm:space-y-6">
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
              <div className="text-sm text-gray-900 leading-relaxed bg-yellow-50 p-4 rounded-lg max-h-40 sm:max-h-60 overflow-y-auto">
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
          <div className="space-y-4 sm:space-y-6">
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
              <p className="text-sm font-medium text-gray-800 truncate">
                {deleteModal.title}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
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
