import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

interface DailyVerseData {
  reference: string;
  text: string;
  reflection: string;
  long_reflection: string;
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

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

function getWIBTime(): Date {
  const now = new Date();
  return new Date(now.getTime() + 7 * 60 * 60 * 1000);
}

function getCurrentWIBPeriod(): string {
  const wibTime = getWIBTime();
  const year = wibTime.getUTCFullYear();
  const month = String(wibTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(wibTime.getUTCDate()).padStart(2, "0");
  const hour = wibTime.getUTCHours();

  // Periode dimulai jam 6 pagi
  if (hour >= 6) {
    return `${year}-${month}-${day}`;
  } else {
    // Jika belum jam 6 pagi, masih periode hari sebelumnya
    const yesterday = new Date(wibTime.getTime() - 24 * 60 * 60 * 1000);
    return `${yesterday.getUTCFullYear()}-${String(
      yesterday.getUTCMonth() + 1
    ).padStart(2, "0")}-${String(yesterday.getUTCDate()).padStart(2, "0")}`;
  }
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

function generateDeterministicSeed(period: string): string {
  return crypto
    .createHash("md5")
    .update(period + "-daily-verse-06:00-WIB")
    .digest("hex");
}

async function generateVerseWithAI(
  seed: string,
  date: string
): Promise<DailyVerseData> {
  const prompt = `Kamu adalah seorang pendeta yang berpengalaman dan memahami Alkitab dengan baik. 

Buatkan satu ayat Alkitab harian untuk tanggal ${date} dengan seed: ${seed.substring(
    0,
    8
  )}.

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
  "reflection": "Refleksi singkat yang praktis dan mudah dipahami",
  "long_reflection": "Refleksi panjang untuk merenungkan ayat ini buat para pembaca, berikan kalimat yang mudah dipahami. berikan minimal 3 paragraf dan gunakan format markdown untuk menebalkan, memiringkan, dan enter sebuah teks."
}

Pastikan referensi ayat benar dan sesuai dengan teks yang diberikan.`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1000,
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
    long_reflection: parsedResponse.long_reflection,
    date: date,
    generated_at: new Date().toISOString(),
  };
}

function getFallbackVerse(date: string): DailyVerseData {
  return {
    reference: "Yeremia 29:11",
    text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    reflection:
      "Tuhan memiliki rencana terbaik untuk hidup kita. Meskipun kadang kita tidak memahami prosesnya, kita dapat percaya bahwa Dia membawa kita menuju masa depan yang penuh harapan.",
    long_reflection:
      "**Tuhan memiliki rencana terbaik untuk hidup kita.** Meskipun kadang kita tidak memahami prosesnya, kita dapat percaya bahwa Dia membawa kita menuju masa depan yang penuh harapan.\n\n*Dalam kehidupan sehari-hari*, kita sering menghadapi tantangan dan ketidakpastian. Namun, ayat ini mengingatkan kita bahwa Tuhan tidak pernah meninggalkan kita.\n\n**Rencana Tuhan** selalu lebih baik dari rencana kita sendiri. Mari percaya pada-Nya dalam setiap langkah hidup kita.",
    date: date,
    generated_at: new Date().toISOString(),
  };
}

async function getOrCreateDailyVerse(
  request: NextRequest,
  period: string
): Promise<DailyVerseData> {
  const supabase = await createClient();

  try {
    // Cek apakah sudah ada ayat untuk periode ini
    const { data: existingVerse, error: fetchError } = await supabase
      .from("daily_verses")
      .select("*")
      .eq("date", period)
      .single();

    if (existingVerse && !fetchError) {
      return {
        reference: existingVerse.reference,
        text: existingVerse.text,
        reflection: existingVerse.reflection,
        long_reflection: existingVerse.long_reflection,
        date: existingVerse.date,
        generated_at: existingVerse.created_at,
      };
    }

    // Generate ayat baru jika belum ada
    const seed = generateDeterministicSeed(period);
    let verse: DailyVerseData;

    try {
      verse = await generateVerseWithAI(seed, period);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      verse = getFallbackVerse(period);
    }

    // Simpan ke database
    const { error: insertError } = await supabase.from("daily_verses").insert({
      date: verse.date,
      reference: verse.reference,
      text: verse.text,
      reflection: verse.reflection,
      long_reflection: verse.long_reflection,
      seed: seed,
    });

    if (insertError) {
      console.error("Failed to save verse to database:", insertError);
    }

    return verse;
  } catch (error) {
    console.error("Database error:", error);
    return getFallbackVerse(period);
  }
}

export async function GET(
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

    const currentPeriod = getCurrentWIBPeriod();
    const verse = await getOrCreateDailyVerse(request, currentPeriod);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily verse retrieved successfully",
      data: verse,
      meta: {
        cached: true,
        seed: generateDeterministicSeed(currentPeriod).substring(0, 8),
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

    const supabase = await createClient();
    const currentPeriod = getCurrentWIBPeriod();

    // Hapus ayat yang sudah ada untuk periode ini
    await supabase.from("daily_verses").delete().eq("date", currentPeriod);

    // Generate ayat baru
    const verse = await getOrCreateDailyVerse(request, currentPeriod);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily verse refreshed successfully",
      data: verse,
      meta: {
        cached: false,
        seed: generateDeterministicSeed(currentPeriod).substring(0, 8),
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
