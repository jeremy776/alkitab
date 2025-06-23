'use client';

import Navbar from '@/components/navbar';
import { useEffect, useState } from 'react';

interface DailyVerse {
    verse: string;
    reference: string;
    reflection: string;
}

export default function DailyVersePage() {
    const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDailyVerse = async () => {
            try {
                // Simulate API call for demo purposes
                // await new Promise(resolve => setTimeout(resolve, 1500));

                const res = await fetch('/api/daily-verse');
                if (!res.ok) {
                    throw new Error("Error fetching daily verse: ${res.statusText}");
                }
                const data = await res.json();

                // Mock data for demonstration
                const mockData = {
                    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
                    reference: "Jeremiah 29:11",
                    reflection: "God's plans for us are always good, even when we can't see the bigger picture. In times of uncertainty, we can trust that He is working all things together for our benefit and His glory. Today, rest in the assurance that your future is secure in His loving hands."
                };

                setDailyVerse(data.data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch daily verse');
            } finally {
                setLoading(false);
            }
        };

        fetchDailyVerse();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Ayat Harian...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!dailyVerse) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Ayat Tidak Tersedia</h2>
                    <p className="text-gray-600">Silakan periksa kembali nanti untuk ayat harian hari ini.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
                </div>

                <div className="relative z-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-screen flex items-center">
                        <div className="w-full">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ayat Harian</h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {new Date().toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Main verse card */}
                            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-gray-100 backdrop-blur-sm bg-opacity-95">
                                {/* Verse text */}
                                <div className="text-center mb-8">
                                    <div className="relative">
                                        <svg className="absolute -top-4 -left-4 w-8 h-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                        </svg>
                                        <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 leading-relaxed italic px-8">
                                            "{dailyVerse.verse}"
                                        </blockquote>
                                        <svg className="absolute -bottom-4 -right-4 w-8 h-8 text-blue-200 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Reference */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="font-semibold text-lg">{dailyVerse.reference}</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center justify-center mb-8">
                                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mx-4"></div>
                                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                </div>

                                {/* Reflection */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
                                    <div className="flex items-start mb-4">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Reflection</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-base md:text-lg pl-11">
                                        {dailyVerse.reflection}
                                    </p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    Share This Verse
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-semibold shadow-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    Save to Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}