"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const NotFoundPage = () => {
  const handleGoHome = () => {
    // In a real Next.js app, you would use router.push('/')
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-6 px-0 sm:px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 opacity-20 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200 opacity-20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-200 opacity-20 rounded-full animate-pulse delay-500"></div>
          </div>

          {/* Main content */}
          <div className="relative z-10 bg-white rounded-3xl p-8 md:p-12 border border-gray-100">
            {/* Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-white"
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

              {/* 404 Number */}
              <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 animate-pulse">
                404
              </div>
            </div>

            {/* Main message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              Halaman Tidak Ditemukan
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin
              halaman tersebut telah dipindahkan atau tidak lagi tersedia.
            </p>

            {/* Bible verse inspiration */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border-l-4 border-blue-500 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 w-6 h-6 text-blue-300 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
                <blockquote className="text-base md:text-lg text-blue-800 italic font-medium px-4">
                  "Dan kita tahu, bahwa Allah turut bekerja dalam segala sesuatu
                  untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia"
                </blockquote>
              </div>
              <div className="mt-4 text-right">
                <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Roma 8:28
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
              <button
                onClick={handleGoHome}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[200px]"
              >
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Kembali ke Beranda
              </button>

              <button
                onClick={handleGoBack}
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-full font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[200px]"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Halaman Sebelumnya
              </button>
            </div>

            {/* Additional help text */}
            <div className="mt-8 pt-6 border-t border-gray-100 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700">
              <p className="text-sm text-gray-500 mb-4">
                Atau Anda dapat mencoba:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Renungan Harian
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Cari Ayat
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Favorit Saya
                </span>
              </div>
            </div>

            {/* Footer message */}
            <div className="mt-8 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1000">
              <p className="text-sm text-gray-500">
                Tuhan memberkati perjalanan Anda hari ini 🙏
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotFoundPage;
