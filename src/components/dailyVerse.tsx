import { useState, useEffect } from "react";

interface VerseData {
  text: string;
  reference: string;
  reflection: string;
  date?: string;
}

interface ApiResponse {
  status_code: number;
  success: boolean;
  message: string;
  data?: {
    reference: string;
    text: string;
    reflection: string;
    date: string;
    generated_at: string;
  };
  error?: string;
  meta?: {
    cached: boolean;
    seed: string;
    next_update?: string;
  };
}

export default function DailyVerse() {
  const [currentVerse, setCurrentVerse] = useState<VerseData>({
    text: "",
    reference: "",
    reflection: "",
  });

  const [apiCallCount, setApiCallCount] = useState(0);
  const [lastCallDate, setLastCallDate] = useState<string | null>(null);
  const [lastAutoCallDate, setLastAutoCallDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAutoCallEnabled, setIsAutoCallEnabled] = useState(true);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const [currentVerseDate, setCurrentVerseDate] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const getStorageData = (key: string, defaultValue: any) => {
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

  const setStorageData = (key: string, value: any) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log("localStorage not available");
    }
  };

  // Fungsi untuk mendapatkan tanggal hari ini dalam format WIB
  const getWIBDateKey = (): string => {
    const now = new Date();
    const wibTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    
    // Jika waktu sekarang belum jam 6 pagi WIB, gunakan tanggal kemarin
    if (wibTime.getUTCHours() < 6) {
      wibTime.setUTCDate(wibTime.getUTCDate() - 1);
    }

    const year = wibTime.getUTCFullYear();
    const month = String(wibTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(wibTime.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Fungsi untuk mengecek apakah sudah saatnya auto call (jam 6 pagi WIB)
  const shouldAutoCall = (): boolean => {
    const now = new Date();
    const wibTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    const currentHour = wibTime.getUTCHours();
    const currentMinute = wibTime.getUTCMinutes();
    const todayWIB = getWIBDateKey();

    // Auto call jika sudah lewat jam 6 pagi WIB dan belum pernah auto call hari ini
    return (
      currentHour >= 6 && 
      lastAutoCallDate !== todayWIB && 
      isAutoCallEnabled
    );
  };

  // Fungsi untuk mengecek apakah verse yang tersimpan masih valid untuk hari ini
  const isStoredVerseValid = (storedVerse: VerseData | null): boolean => {
    if (!storedVerse || !storedVerse.date) return false;
    
    const todayWIB = getWIBDateKey();
    return storedVerse.date === todayWIB;
  };

  const callVerseAPI = async (isAutoCall = false, isInitialLoad = false) => {
    if (loading && !isInitialLoad) return;

    const today = new Date().toDateString();
    const todayWIB = getWIBDateKey();

    if (
      apiCallCount >= 5 &&
      lastCallDate === today &&
      !isAutoCall &&
      !isInitialLoad
    ) {
      alert("Limit harian sudah tercapai (5x). Coba lagi besok ya! 😊");
      return;
    }

    if (!isInitialLoad) {
      setLoading(true);
    }

    try {
      const response = await fetch("/api/daily-verse", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: ApiResponse = await response.json();

      if (result.success && result.data) {
        const verseData: VerseData = {
          text: result.data.text,
          reference: result.data.reference,
          reflection: result.data.reflection,
          date: result.data.date,
        };

        setCurrentVerse(verseData);
        setCurrentVerseDate(result.data.date);

        // Simpan verse dengan key berdasarkan tanggal verse
        setStorageData(`verse_${result.data.date}`, verseData);
        setStorageData("lastVerseDate", result.data.date);

        // Simpan informasi next update jika ada
        if (result.meta?.next_update) {
          setNextUpdate(result.meta.next_update);
          setStorageData("nextUpdate", result.meta.next_update);
        }

        console.log("Verse loaded:", {
          date: result.data.date,
          cached: result.meta?.cached || false,
          nextUpdate: result.meta?.next_update
        });
      } else {
        throw new Error(result.error || "API request failed");
      }

      // Update call count hanya untuk manual calls
      if (!isInitialLoad) {
        const newCount = lastCallDate === today ? apiCallCount + 1 : 1;
        setApiCallCount(newCount);
        setLastCallDate(today);
        setStorageData("apiCallCount", newCount);
        setStorageData("lastCallDate", today);
      }

      // Update auto call date
      if (isAutoCall) {
        setLastAutoCallDate(todayWIB);
        setStorageData("lastAutoCallDate", todayWIB);
      }
    } catch (error) {
      console.error("Error calling API:", error);

      if (isInitialLoad) {
        setCurrentVerse({
          text: "Tidak dapat memuat ayat. Silakan coba lagi.",
          reference: "Error",
          reflection: "Terjadi kesalahan saat memuat ayat harian.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAndLoadVerse = async () => {
      const today = new Date().toDateString();
      const todayWIB = getWIBDateKey();
      
      // Load stored data
      const storedCount = getStorageData("apiCallCount", 0);
      const storedDate = getStorageData("lastCallDate", null);
      const storedAutoCallDate = getStorageData("lastAutoCallDate", null);
      const storedNextUpdate = getStorageData("nextUpdate", null);
      const lastVerseDate = getStorageData("lastVerseDate", null);
      
      // Reset call count jika sudah ganti hari
      if (storedDate !== today) {
        setApiCallCount(0);
        setStorageData("apiCallCount", 0);
        setStorageData("lastCallDate", today);
      } else {
        setApiCallCount(storedCount);
      }

      setLastCallDate(storedDate);
      setLastAutoCallDate(storedAutoCallDate);
      setNextUpdate(storedNextUpdate);

      // Coba load verse yang tersimpan untuk hari ini
      const storedVerse = getStorageData(`verse_${todayWIB}`, null);
      
      if (isStoredVerseValid(storedVerse)) {
        console.log("Loading cached verse for:", todayWIB);
        setCurrentVerse(storedVerse);
        setCurrentVerseDate(storedVerse.date);
        setLoading(false);
        setHasInitialLoad(true);
      } else {
        console.log("Loading new verse for:", todayWIB);
        if (!hasInitialLoad) {
          await callVerseAPI(false, true);
          setHasInitialLoad(true);
        }
      }
    };

    initializeAndLoadVerse();
  }, []);

  useEffect(() => {
    if (!hasInitialLoad) return;

    const checkAutoCall = () => {
      if (shouldAutoCall()) {
        console.log("Auto calling API at 6 AM WIB for new day");
        callVerseAPI(true);
      }
    };

    checkAutoCall();

    // Check setiap menit
    const interval = setInterval(checkAutoCall, 60000);

    return () => clearInterval(interval);
  }, [lastAutoCallDate, isAutoCallEnabled, hasInitialLoad]);

  const handleSaveVerse = () => {
    alert("Ayat berhasil disimpan! 💾");
  };

  const handleShareVerse = async () => {
    if (loading || !currentVerse.text) return;

    setIsSharing(true);

    const shareText = `📖 Ayat Harian - SelaVibes

"${currentVerse.text}"
— ${currentVerse.reference}

💭 ${currentVerse.reflection}

Kunjungi SelaVibes untuk ayat harian lainnya! ✨
${window.location.href}`;

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ text: shareText })
      ) {
        await navigator.share({
          title: "Ayat Harian - SelaVibes",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      console.log("Share failed, falling back to clipboard:", error);
      try {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (clipboardError) {
        console.error("Clipboard access failed:", clipboardError);
        alert("Maaf, fitur share tidak tersedia di browser ini 😔");
      }
    } finally {
      setIsSharing(false);
    }
  };
  // Format next update time untuk display
  const formatNextUpdate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      });
    } catch {
      return "Besok jam 6 pagi WIB";
    }
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

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-12 -mb-12"></div>

          <div className="text-5xl text-indigo-200 mb-4">"</div>

          {loading ? (
            <div className="text-xl text-indigo-600 py-8">
              <div className="animate-pulse">
                {hasInitialLoad
                  ? "Sedang memuat ayat baru..."
                  : "Memuat ayat harian..."}
              </div>
            </div>
          ) : (
            <>
              <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed mb-6 relative z-10">
                "{currentVerse.text}"
              </blockquote>

              <cite className="text-indigo-600 font-semibold text-lg">
                — {currentVerse.reference}
              </cite>

              {currentVerse.reflection && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-gray-600 italic text-sm sm:text-base">
                    💭 {currentVerse.reflection}
                  </p>
                </div>
              )}
            </>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
              <p>
                📅 {currentVerseDate ? 
                  new Date(currentVerseDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) :
                  new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }
              </p>
              {nextUpdate && (
                <p className="text-xs text-indigo-600">
                  🔄 Update berikutnya: {formatNextUpdate(nextUpdate)}
                </p>
              )}
            </div>
          </div>
        </div>

        {isCopied && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <span className="font-medium">
                Ayat berhasil disalin ke clipboard!
              </span>
            </div>
          </div>
        )}

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
            disabled={loading || !currentVerse.text || isSharing}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 relative overflow-hidden ${
              loading || !currentVerse.text || isSharing
                ? "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border border-indigo-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-600 hover:scale-105 active:scale-95"
            }`}
          >
            {isSharing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>
                <span>Menyalin...</span>
              </>
            ) : isCopied ? (
              <>
                <span className="text-green-500">✅</span>
                <span className="text-green-600">Tersalin!</span>
              </>
            ) : (
              <>
                <span>📤</span>
                <span>Share ke Teman</span>
              </>
            )}
          </button>

        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-200">
            <div className="text-2xl mb-2">📖</div>
            <h4 className="font-semibold text-gray-800 mb-1">365 Ayat</h4>
            <p className="text-sm text-gray-600">
              Satu ayat setiap hari sepanjang tahun
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-200">
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-semibold text-gray-800 mb-1">
              Update Otomatis
            </h4>
            <p className="text-sm text-gray-600">
              Ayat berganti otomatis setiap hari jam 6 pagi WIB
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/80 transition-all duration-200">
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