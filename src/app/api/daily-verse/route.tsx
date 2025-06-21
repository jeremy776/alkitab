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
  };
}

const verseCache = new Map<string, DailyVerseData>();

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");

function getTodayWIBDateKey(): string {
  const now = new Date();
  const wibTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  const year = wibTime.getUTCFullYear();
  const month = String(wibTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(wibTime.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}-06:00:00-WIB`;
}

function generateDeterministicSeed(dateKey: string): string {
  return crypto.createHash("md5").update(dateKey).digest("hex");
}

async function generateVerseWithAI(
  seed: string,
  dateKey: string
): Promise<DailyVerseData> {
  const prompt = `Kamu adalah seorang pendeta yang berpengalaman dan memahami Alkitab dengan baik. 

Buatkan satu ayat Alkitab harian untuk tanggal ${
    dateKey.split("-06:00:00-WIB")[0]
  } dengan seed: ${seed.substring(0, 8)}.

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
    date: dateKey.split("-06:00:00-WIB")[0],
    generated_at: new Date().toISOString(),
  };
}

function getFallbackVerse(dateKey: string): DailyVerseData {
  return {
    reference: "Yeremia 29:11",
    text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    reflection:
      "Tuhan memiliki rencana terbaik untuk hidup kita. Meskipun kadang kita tidak memahami prosesnya, kita dapat percaya bahwa Dia membawa kita menuju masa depan yang penuh harapan.",
    date: dateKey.split("-06:00:00-WIB")[0],
    generated_at: new Date().toISOString(),
  };
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

    if (verseCache.has(dateKey)) {
      const cachedVerse = verseCache.get(dateKey)!;
      return NextResponse.json<ApiResponse>({
        status_code: 200,
        success: true,
        message: "Daily verse retrieved successfully",
        data: cachedVerse,
        meta: {
          cached: true,
          seed: generateDeterministicSeed(dateKey).substring(0, 8),
        },
      });
    }

    const seed = generateDeterministicSeed(dateKey);
    let verse: DailyVerseData;

    try {
      verse = await generateVerseWithAI(seed, dateKey);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      verse = getFallbackVerse(dateKey);
    }

    verseCache.set(dateKey, verse);

    if (verseCache.size > 7) {
      const oldestKey = verseCache.keys().next().value;
      if (typeof oldestKey === "string") {
        verseCache.delete(oldestKey);
      }
    }

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily verse generated successfully",
      data: verse,
      meta: {
        cached: false,
        seed: seed.substring(0, 8),
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
