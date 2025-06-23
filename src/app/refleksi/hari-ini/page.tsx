"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

interface DailyVerse {
  text: string;
  reference: string;
  reflection: string;
  long_reflection: string;
  date: string;
  generated_at: string;
}

export default function DailyVersePage() {
  const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        const res = await fetch("/api/daily-verse");
        if (!res.ok) {
          throw new Error(`Error fetching daily verse: ${res.statusText}`);
        }
        const response = await res.json();
        setDailyVerse(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch daily verse");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);
  const formatLongReflection = (text: string) => {
    const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0);

    return paragraphs.map((paragraph, index) => {
      let formattedText = paragraph;

      // Bold text with ** or __
      formattedText = formattedText.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold text-gray-900">$1</strong>'
      );
      formattedText = formattedText.replace(
        /__(.*?)__/g,
        '<strong class="font-bold text-gray-900">$1</strong>'
      );

      // Italic text with * or _
      formattedText = formattedText.replace(
        /(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g,
        '<em class="italic text-blue-700 font-medium">$1</em>'
      );
      formattedText = formattedText.replace(
        /(?<!_)_(?!_)([^_]+)_(?!_)/g,
        '<em class="italic text-blue-700 font-medium">$1</em>'
      );

      // Bold and italic with *** or ___
      formattedText = formattedText.replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<strong><em class="font-bold italic text-blue-800">$1</em></strong>'
      );
      formattedText = formattedText.replace(
        /___(.*?)___/g,
        '<strong><em class="font-bold italic text-blue-800">$1</em></strong>'
      );

      // Inline code with `
      formattedText = formattedText.replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">$1</code>'
      );

      // Strikethrough with ~~
      formattedText = formattedText.replace(
        /~~(.*?)~~/g,
        '<del class="line-through text-gray-500">$1</del>'
      );

      // Highlight with ==
      formattedText = formattedText.replace(
        /==(.*?)==/g,
        '<mark class="bg-yellow-200 text-yellow-900 px-1 rounded">$1</mark>'
      );

      // Links with [text](url)
      formattedText = formattedText.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      // Headers (only for h4-h6 to avoid conflict with main structure)
      if (formattedText.startsWith("#### ")) {
        const headerText = formattedText.replace(/^#### /, "");
        return (
          <h4
            key={index}
            className="text-xl font-bold text-gray-900 mb-4 mt-8 border-b border-gray-200 pb-2"
            dangerouslySetInnerHTML={{ __html: headerText }}
          />
        );
      }

      if (formattedText.startsWith("##### ")) {
        const headerText = formattedText.replace(/^##### /, "");
        return (
          <h5
            key={index}
            className="text-lg font-semibold text-gray-800 mb-3 mt-6"
            dangerouslySetInnerHTML={{ __html: headerText }}
          />
        );
      }

      if (formattedText.startsWith("###### ")) {
        const headerText = formattedText.replace(/^###### /, "");
        return (
          <h6
            key={index}
            className="text-base font-semibold text-gray-700 mb-2 mt-4"
            dangerouslySetInnerHTML={{ __html: headerText }}
          />
        );
      }

      // Blockquotes with >
      if (formattedText.startsWith("> ")) {
        const quoteText = formattedText.replace(/^> /, "");
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-6 py-2 mb-6 bg-blue-50 rounded-r-lg italic text-blue-800"
            dangerouslySetInnerHTML={{ __html: quoteText }}
          />
        );
      }

      // Lists (unordered with - or *)
      if (formattedText.includes("\n- ") || formattedText.includes("\n* ")) {
        const listItems = formattedText
          .split("\n")
          .filter(
            (line) =>
              line.trim().startsWith("- ") || line.trim().startsWith("* ")
          );
        const nonListText = formattedText
          .split("\n")
          .filter(
            (line) =>
              !line.trim().startsWith("- ") && !line.trim().startsWith("* ")
          )
          .join("\n");

        return (
          <div key={index} className="mb-6">
            {nonListText && (
              <p
                className="text-gray-700 leading-relaxed text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: nonListText }}
              />
            )}
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {listItems.map((item, itemIndex) => {
                const cleanItem = item.replace(/^[*-]\s/, "");
                return (
                  <li
                    key={itemIndex}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: cleanItem }}
                  />
                );
              })}
            </ul>
          </div>
        );
      }

      // Ordered lists with numbers
      if (/^\d+\.\s/.test(formattedText) || /\n\d+\.\s/.test(formattedText)) {
        const listItems = formattedText
          .split("\n")
          .filter((line) => /^\d+\.\s/.test(line.trim()));
        const nonListText = formattedText
          .split("\n")
          .filter((line) => !/^\d+\.\s/.test(line.trim()))
          .join("\n");

        return (
          <div key={index} className="mb-6">
            {nonListText && (
              <p
                className="text-gray-700 leading-relaxed text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: nonListText }}
              />
            )}
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              {listItems.map((item, itemIndex) => {
                const cleanItem = item.replace(/^\d+\.\s/, "");
                return (
                  <li
                    key={itemIndex}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: cleanItem }}
                  />
                );
              })}
            </ol>
          </div>
        );
      }

      // Horizontal rule with ---
      if (formattedText.trim() === "---") {
        return <hr key={index} className="my-8 border-gray-300" />;
      }

      // Regular paragraph
      return (
        <p
          key={index}
          className="mb-6 text-gray-700 leading-relaxed text-lg first:text-xl first:font-medium first:text-gray-800"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `"${dailyVerse?.text}"\n\n${dailyVerse?.reference}\n\n${dailyVerse?.reflection}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Renungan Harian - ${dailyVerse?.reference}`,
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setIsSharing(false);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save to user's favorites
    // For now, just show visual feedback
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-fetch the data
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
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
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            Memuat Ayat Harian...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Mempersiapkan firman untuk hari ini
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-red-600 mb-6 text-sm leading-relaxed">{error}</p>
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dailyVerse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-500"
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
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ayat Tidak Tersedia
          </h2>
          <p className="text-gray-600 mb-6">
            Silakan periksa kembali nanti untuk ayat harian hari ini.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Copy feedback notification */}
        {copyFeedback && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Disalin ke clipboard!
            </div>
          </div>
        )}

        {/* Hero Section with Verse */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-16 md:py-20">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 -left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute bottom-10 right-1/3 w-16 h-16 bg-white opacity-5 rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
              <svg
                className="w-8 h-8 text-white"
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
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              Renungan Harian
            </h1>

            <p className="text-blue-100 text-lg mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150">
              {new Date(dailyVerse.date).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Featured Verse */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white border-opacity-20 animate-in fade-in-0 slide-in-from-bottom-4 delay-300 hover:bg-opacity-15 transition-all duration-300">
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
                <blockquote className="text-black text-lg md:text-xl lg:text-2xl font-serif leading-relaxed italic px-6 text-center">
                  "{dailyVerse.text}"
                </blockquote>
              </div>

              <div className="mt-6">
                <div className="inline-flex items-center bg-blue-500 bg-opacity-20 text-white px-4 py-2 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-semibold text-white">
                    {dailyVerse.reference}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content Section */}
        <div className="max-w-4xl mx-auto sm:px-6 py-12 md:py-16">
          <article className="bg-white rounded-3xl overflow-hidden animate-in fade-in-0 slide-in-from-bottom-8 duration-700">
            {/* Article Header */}
            <div className="px-6 md:px-8 lg:px-12 py-6 md:py-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <time dateTime={dailyVerse.generated_at}>
                    {new Date(dailyVerse.generated_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    Renungan
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">5 menit baca</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Refleksi: {dailyVerse.reference}
              </h2>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Renungan Harian</p>
                  <p className="text-sm text-gray-500">
                    Inspirasi untuk hari ini
                  </p>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="px-6 md:px-8 lg:px-12 py-8">
              {/* Short reflection as intro */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-500 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Ringkasan
                </h3>
                <p className="text-gray-700 leading-relaxed italic text-lg">
                  {dailyVerse.reflection}
                </p>
              </div>

              {/* Long reflection content */}
              <div className="prose prose-lg max-w-none">
                <div className="space-y-2">
                  {formatLongReflection(dailyVerse.long_reflection)}
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-12 p-6 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 hover:transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                  Bagikan Berkat Ini
                </h3>
                <p className="text-gray-600 text-center mb-6 max-w-md mx-auto">
                  Mari berbagi firman Tuhan kepada orang-orang terkasih
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={handleShare}
                    disabled={isSharing}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[140px]"
                  >
                    {isSharing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Membagikan...
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 inline mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                        Bagikan Ayat
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleSave}
                    className={`${
                      isSaved
                        ? "bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                    } px-8 py-3 rounded-full font-semibold border transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[140px]`}
                  >
                    <svg
                      className={`w-5 h-5 inline mr-2 ${
                        isSaved ? "fill-current" : ""
                      }`}
                      fill={isSaved ? "currentColor" : "none"}
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
                    {isSaved ? "Tersimpan" : "Simpan ke Favorit"}
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Related or Navigation Section */}
          <div className="mt-10 px-10 sm:px-0 flex flex-col sm:flex-row gap-2 justify-center">
            <button className="flex items-center justify-center px-15 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Renungan Sebelumnya
            </button>
            {/* <button className="flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Renungan Selanjutnya
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
