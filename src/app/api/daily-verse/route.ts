import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface DailyVerseData {
  reference: string;
  text: string;
  reflection: string;
  date: string;
  generated_at: string;
}

interface ApiResponse {
  status_code: number;
  success: boolean;
  message: string;
  data?: DailyVerseData;
  error?: string;
  meta?: {
    cached: boolean;
    seed: string;
    next_update?: string;
  };
}

const verseCache = new Map<string, DailyVerseData>();

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");

function getWIBTime(): Date {
  const now = new Date();
  return new Date(now.getTime() + 7 * 60 * 60 * 1000);
}

function getTodayWIBDateKey(): string {
  const wibTime = getWIBTime();
  
  // Jika waktu sekarang belum jam 6 pagi WIB, gunakan tanggal kemarin
  if (wibTime.getUTCHours() < 6) {
    wibTime.setUTCDate(wibTime.getUTCDate() - 1);
  }

  const year = wibTime.getUTCFullYear();
  const month = String(wibTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(wibTime.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getNextUpdateTime(): string {
  const wibTime = getWIBTime();
  let nextUpdate = new Date(wibTime);
  
  // Set ke jam 6 pagi hari ini
  nextUpdate.setUTCHours(6, 0, 0, 0);
  
  // Jika sudah lewat jam 6 pagi, set ke jam 6 pagi besok
  if (wibTime.getUTCHours() >= 6) {
    nextUpdate.setUTCDate(nextUpdate.getUTCDate() + 1);
  }
  
  // Convert back to local time untuk display
  return new Date(nextUpdate.getTime() - 7 * 60 * 60 * 1000).toISOString();
}

function shouldUpdateCache(dateKey: string): boolean {
  const wibTime = getWIBTime();
  const currentHour = wibTime.getUTCHours();
  
  // Jika cache tidak ada untuk tanggal ini, perlu update
  if (!verseCache.has(dateKey)) {
    return true;
  }
  
  // Jika sudah lewat jam 6 pagi dan cache masih untuk hari sebelumnya
  if (currentHour >= 6) {
    const cachedVerse = verseCache.get(dateKey);
    if (cachedVerse) {
      const today = getTodayWIBDateKey();
      return cachedVerse.date !== today;
    }
  }
  
  return false;
}

function generateDeterministicSeed(dateKey: string): string {
  return crypto.createHash("md5").update(dateKey + "-06:00:00-WIB").digest("hex");
}

async function generateVerseWithAI(
  seed: string,
  dateKey: string
): Promise<DailyVerseData> {
  const prompt = `Kamu adalah seorang pendeta yang berpengalaman dan memahami Alkitab dengan baik. 

Buatkan satu ayat Alkitab harian untuk tanggal ${dateKey} dengan seed: ${seed.substring(0, 8)}.

Syarat:
1. Pilih ayat yang relevan untuk kehidupan sehari-hari
2. Berikan teks ayat dalam bahasa Indonesia
3. Sertakan referensi yang akurat (kitab, pasal, ayat)
4. Tambahkan refleksi singkat (2-3 kalimat) yang praktis dan mudah dipahami
5. Tampilkan maksimal hanya 1 ayat saja

Format response dalam JSON:
{
  "reference": "Nama Kitab Pasal:Ayat",
  "text": "Teks ayat lengkap dalam bahasa Indonesia",
  "reflection": "Refleksi singkat yang praktis dan mudah dipahami"
}

Pastikan referensi ayat benar dan sesuai dengan teks yang diberikan.`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const aiResponse = response.text();

  if (!aiResponse) {
    throw new Error("No response from AI");
  }

  const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, "").trim();
  const parsedResponse = JSON.parse(cleanedResponse);

  return {
    reference: parsedResponse.reference,
    text: parsedResponse.text,
    reflection: parsedResponse.reflection,
    date: dateKey,
    generated_at: new Date().toISOString(),
  };
}

function getFallbackVerse(dateKey: string): DailyVerseData {
  return {
    reference: "Yeremia 29:11",
    text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    reflection:
      "Tuhan memiliki rencana terbaik untuk hidup kita. Meskipun kadang kita tidak memahami prosesnya, kita dapat percaya bahwa Dia membawa kita menuju masa depan yang penuh harapan.",
    date: dateKey,
    generated_at: new Date().toISOString(),
  };
}

function cleanOldCache(): void {
  const today = getTodayWIBDateKey();
  const keysToDelete: string[] = [];
  
  for (const [key, verse] of verseCache.entries()) {
    // Hapus cache yang lebih dari 2 hari
    if (verse.date !== today) {
      const verseDate = new Date(verse.date);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - verseDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        keysToDelete.push(key);
      }
    }
  }
  
  keysToDelete.forEach(key => verseCache.delete(key));
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    if (!API_KEY) {
      return NextResponse.json<ApiResponse>(
        {
          status_code: 500,
          success: false,
          message: "Service configuration error",
          error: "Gemini API key not configured",
        },
        { status: 500 }
      );
    }

    const dateKey = getTodayWIBDateKey();
    const needsUpdate = shouldUpdateCache(dateKey);

    // Bersihkan cache lama
    cleanOldCache();

    // Jika tidak perlu update dan cache ada, return cache
    if (!needsUpdate && verseCache.has(dateKey)) {
      const cachedVerse = verseCache.get(dateKey)!;
      return NextResponse.json<ApiResponse>({
        status_code: 200,
        success: true,
        message: "Daily verse retrieved successfully",
        data: cachedVerse,
        meta: {
          cached: true,
          seed: generateDeterministicSeed(dateKey).substring(0, 8),
          next_update: getNextUpdateTime(),
        },
      });
    }

    // Generate verse baru
    const seed = generateDeterministicSeed(dateKey);
    let verse: DailyVerseData;

    try {
      verse = await generateVerseWithAI(seed, dateKey);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      verse = getFallbackVerse(dateKey);
    }

    verseCache.set(dateKey, verse);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily verse generated successfully",
      data: verse,
      meta: {
        cached: false,
        seed: seed.substring(0, 8),
        next_update: getNextUpdateTime(),
      },
    });
  } catch (error) {
    console.error("Daily verse API error:", error);

    return NextResponse.json<ApiResponse>(
      {
        status_code: 500,
        success: false,
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    if (!API_KEY) {
      return NextResponse.json<ApiResponse>(
        {
          status_code: 500,
          success: false,
          message: "Service configuration error",
          error: "Gemini API key not configured",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { forceRefresh } = body;

    if (!forceRefresh) {
      return NextResponse.json<ApiResponse>(
        {
          status_code: 400,
          success: false,
          message: "Bad request",
          error: "forceRefresh parameter is required",
        },
        { status: 400 }
      );
    }

    const dateKey = getTodayWIBDateKey();
    
    // Hapus cache untuk tanggal ini
    verseCache.delete(dateKey);

    const seed = generateDeterministicSeed(dateKey);
    let verse: DailyVerseData;

    try {
      verse = await generateVerseWithAI(seed, dateKey);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      verse = getFallbackVerse(dateKey);
    }

    verseCache.set(dateKey, verse);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily verse refreshed successfully",
      data: verse,
      meta: {
        cached: false,
        seed: seed.substring(0, 8),
        next_update: getNextUpdateTime(),
      },
    });
  } catch (error) {
    console.error("Daily verse POST error:", error);

    return NextResponse.json<ApiResponse>(
      {
        status_code: 500,
        success: false,
        message: "Internal server error",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}