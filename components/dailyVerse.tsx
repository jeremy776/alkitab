import { useState, useEffect } from "react";

export default function DailyVerse() {
  const [currentVerse, setCurrentVerse] = useState<any>({});

  // State untuk tracking API calls
  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastCallDate, setLastCallDate] = useState<any>(null);
  const [lastAutoCallDate, setLastAutoCallDate] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Set initial loading ke true
  const [isAutoCallEnabled, setIsAutoCallEnabled] = useState(true);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [todayVerseDate, setTodayVerseDate] = useState<any>(null); // Track tanggal ayat hari ini

  // Fungsi untuk mendapatkan data dari localStorage (fallback ke state jika tidak tersedia)
  const getStorageData = (key: any, defaultValue: any) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      }
    } catch (error) {
      console.log("localStorage not available, using state");
    }
    return defaultValue;
  };

  // Fungsi untuk menyimpan data ke localStorage (fallback ke state jika tidak tersedia)
  const setStorageData = (key:any, value:any) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log("localStorage not available");
    }
  };

  // Fungsi untuk mengecek apakah sudah jam 6 pagi dan belum auto call hari ini
  const shouldAutoCall = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const today = now.toDateString();

    // Cek apakah jam 6 pagi atau lebih dan belum auto call hari ini
    return currentHour >= 6 && lastAutoCallDate !== today && isAutoCallEnabled;
  };

  // Fungsi untuk mengecek apakah perlu load ayat baru (belum ada ayat hari ini)
  const shouldLoadTodayVerse = () => {
    const today = new Date().toDateString();
    return todayVerseDate !== today;
  };

  // Fungsi untuk parsing response yang baru (format sederhana)
  const parseSimpleResponse = (gptText: string) => {
    try {
      // Parse format baru yang lebih sederhana
      // Format: "ReferReferensi: Filipi 4:13 \nAyat: \"Segala perkara...\""
      
      console.log("Raw GPT response:", gptText);
      
      // Clean up response text
      const cleanText = gptText.trim();
      
      // Extract referensi menggunakan regex
      const referensiMatch = cleanText.match(/Refer?e?n?s?i:\s*([^\n]+)/i);
      
      // Extract ayat menggunakan regex
      const ayatMatch = cleanText.match(/Ayat:\s*"([^"]+)"/i);
      
      if (referensiMatch && ayatMatch) {
        const reference = referensiMatch[1].trim();
        const text = ayatMatch[1].trim();
        
        return {
          text: text,
          reference: reference,
          tema: null // Tidak ada tema di format baru
        };
      } else {
        // Fallback parsing jika format tidak sesuai
        console.log("Attempting fallback parsing...");
        
        // Coba split by line dan cari pattern
        const lines = cleanText.split('\n');
        let reference = '';
        let text = '';
        
        for (const line of lines) {
          if (line.toLowerCase().includes('referen') || line.toLowerCase().includes('refer')) {
            reference = line.replace(/[^:]*:\s*/, '').trim();
          } else if (line.toLowerCase().includes('ayat')) {
            text = line.replace(/[^:]*:\s*/, '').replace(/^"|"$/g, '').trim();
          }
        }
        
        if (reference && text) {
          return {
            text: text,
            reference: reference,
            tema: null
          };
        } else {
          throw new Error('Could not parse response with fallback method');
        }
      }
    } catch (error) {
      console.error('Error parsing simple response:', error);
      throw error;
    }
  };

  // Fungsi untuk memanggil API
  const callVerseAPI = async (isAutoCall = false, isInitialLoad = false) => {
    if (loading && !isInitialLoad) return;

    const today = new Date().toDateString();

    // Cek cooldown harian (maksimal 5x) - skip untuk initial load
    if (apiCallCount >= 5 && lastCallDate === today && !isAutoCall && !isInitialLoad) {
      alert("Limit harian sudah tercapai (5x). Coba lagi besok ya! 😊");
      return;
    }

    if (!isInitialLoad) {
      setLoading(true);
    }

    try {
      // Ganti dengan URL API Anda yang sebenarnya
      const response = await fetch("/api/renungan/ayat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.result && data.result.gpt) {
        try {
          // Parse response dengan format baru yang lebih sederhana
          const verseData = parseSimpleResponse(data.result.gpt);
          
          setCurrentVerse(verseData);
          
        } catch (parseError) {
          console.error("Error parsing GPT response:", parseError);
          console.log("Failed to parse:", data.result.gpt);
          
          // Ultimate fallback
          setCurrentVerse({
            text: "Gagal memproses response API. Response: " + data.result.gpt.substring(0, 100) + "...",
            reference: "Error",
          });
        }

        // Update counter dan tanggal - hanya jika bukan initial load
        if (!isInitialLoad) {
          const newCount = lastCallDate === today ? apiCallCount + 1 : 1;
          setApiCallCount(newCount);
          setLastCallDate(today);
          setStorageData("apiCallCount", newCount);
          setStorageData("lastCallDate", today);
        }

        if (isAutoCall) {
          setLastAutoCallDate(today);
          setStorageData("lastAutoCallDate", today);
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      
      // Untuk initial load, jangan tampilkan fallback verse
      if (isInitialLoad) {
        setCurrentVerse({
          text: "Tidak dapat memuat ayat. Silakan coba lagi.",
          reference: "Error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Initialize data dan load ayat pertama kali
  useEffect(() => {
    const initializeAndLoadVerse = async () => {
      const today = new Date().toDateString();
      const storedCount = getStorageData("apiCallCount", 0);
      const storedDate = getStorageData("lastCallDate", null);
      const storedAutoCallDate = getStorageData("lastAutoCallDate", null);
      const storedVerseDate = getStorageData("todayVerseDate", null);
      const storedVerse = getStorageData("todayVerse", null);

      // Reset counter jika hari berbeda
      if (storedDate !== today) {
        setApiCallCount(0);
        setStorageData("apiCallCount", 0);
        setStorageData("lastCallDate", today);
      } else {
        setApiCallCount(storedCount);
      }

      setLastCallDate(storedDate);
      setLastAutoCallDate(storedAutoCallDate);
      setTodayVerseDate(storedVerseDate);

      // Cek apakah sudah ada ayat untuk hari ini
      if (storedVerseDate === today && storedVerse) {
        // Gunakan ayat yang tersimpan
        console.log("Loading saved verse for today");
        setCurrentVerse(storedVerse);
        setLoading(false);
        setHasInitialLoad(true);
      } else {
        // Load ayat baru untuk hari ini
        console.log("Loading new verse for today");
        if (!hasInitialLoad) {
          await callVerseAPI(false, true);
          setHasInitialLoad(true);
        }
      }
    };

    initializeAndLoadVerse();
  }, []);

  // Auto call setiap jam 6 pagi
  useEffect(() => {
    if (!hasInitialLoad) return; // Tunggu initial load selesai

    const checkAutoCall = () => {
      if (shouldAutoCall() && shouldLoadTodayVerse()) {
        console.log("Auto calling API at 6 AM for new day");
        callVerseAPI(true);
      }
    };

    // Cek saat component mount
    checkAutoCall();

    // Set interval untuk cek setiap menit
    const interval = setInterval(checkAutoCall, 60000);

    return () => clearInterval(interval);
  }, [lastAutoCallDate, isAutoCallEnabled, hasInitialLoad, todayVerseDate]);

  const handleSaveVerse = () => {
    // Logic untuk menyimpan ayat
    alert("Ayat berhasil disimpan! 💾");
  };

  const handleShareVerse = () => {
    // Logic untuk share ayat
    if (navigator.share) {
      navigator.share({
        title: "Ayat Harian - SelaVibes",
        text: `"${currentVerse.text}" - ${currentVerse.reference}`,
        url: window.location.href,
      });
    } else {
      // Fallback untuk browser yang tidak support Web Share API
      navigator.clipboard.writeText(
        `"${currentVerse.text}" - ${currentVerse.reference}`
      );
      alert("Ayat berhasil disalin ke clipboard! 📋");
    }
  };

  const handleGetNewVerse = () => {
    // Hanya izinkan manual call jika masih dalam limit dan user memang ingin ayat yang berbeda
    const today = new Date().toDateString();
    if (apiCallCount >= 5 && lastCallDate === today) {
      alert("Limit harian sudah tercapai (5x). Ayat akan otomatis berganti besok jam 6 pagi! 😊");
      return;
    }
    callVerseAPI(false);
  };

  const today = new Date().toDateString();
  const canCallAPI = apiCallCount < 5 || lastCallDate !== today;
  const remainingCalls =
    lastCallDate === today ? Math.max(0, 5 - apiCallCount) : 5;

  return (
    <section
      id="daily-verse"
      className="bg-gradient-to-br from-indigo-50 to-purple-50 py-20 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-indigo-700 bg-white/80 rounded-full shadow-sm">
            ✨ Ayat Hari Ini
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Firman yang Menguatkan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Setiap hari, satu ayat yang dipilih khusus buat menguatkan harimu.
            Simple tapi dalem maknanya 💙
          </p>
        </div>

        {/* Main Verse Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-12 -mb-12"></div>

          {/* Quote icon */}
          <div className="text-5xl text-indigo-200 mb-4">"</div>

          {/* Verse content */}
          {loading ? (
            <div className="text-xl text-indigo-600 py-8">
              <div className="animate-pulse">
                {hasInitialLoad ? "Sedang memuat ayat baru..." : "Memuat ayat harian..."}
              </div>
            </div>
          ) : (
            <>
              <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed mb-6 relative z-10">
                "{currentVerse.text}"
              </blockquote>

              {/* Reference */}
              <cite className="text-indigo-600 font-semibold text-lg">
                — {currentVerse.reference}
              </cite>
            </>
          )}

          {/* Date */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              📅{" "}
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* API Call Info */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/50">
          <p className="text-sm text-gray-600">
            📊 Panggilan API hari ini: {apiCallCount}/5
            {remainingCalls > 0 && (
              <span className="text-indigo-600 ml-2">
                (Tersisa {remainingCalls}x)
              </span>
            )}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleSaveVerse}
            disabled={loading || !currentVerse.text}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 ${
              loading || !currentVerse.text
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <span>💾</span>
            Simpan Ayat Ini
          </button>
          <button
            onClick={handleShareVerse}
            disabled={loading || !currentVerse.text}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              loading || !currentVerse.text
                ? "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border border-indigo-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-600"
            }`}
          >
            <span>📤</span>
            Share ke Teman
          </button>
          <button
            onClick={handleGetNewVerse}
            disabled={!canCallAPI || loading}
            className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              canCallAPI && !loading
                ? "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>🔄</span>
            {loading ? "Loading..." : "Ayat Acak"}
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <div className="text-2xl mb-2">📖</div>
            <h4 className="font-semibold text-gray-800 mb-1">365 Ayat</h4>
            <p className="text-sm text-gray-600">
              Satu ayat setiap hari sepanjang tahun
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-semibold text-gray-800 mb-1">Update Otomatis</h4>
            <p className="text-sm text-gray-600">
              Ayat berganti otomatis setiap hari jam 6 pagi
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
            <div className="text-2xl mb-2">❤️</div>
            <h4 className="font-semibold text-gray-800 mb-1">Persisten</h4>
            <p className="text-sm text-gray-600">
              Ayat harian tetap sama meski di-refresh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}