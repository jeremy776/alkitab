import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

interface DailyPrayData {
  prayer: string;
  date: string;
  generated_at: string;
}

interface ApiResponse {
  status_code: number;
  success: boolean;
  message: string;
  data?: DailyPrayData;
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
    .update(period + "-daily-prayer-06:00-WIB")
    .digest("hex");
}

async function generatePrayWithAI(
  seed: string,
  date: string
): Promise<DailyPrayData> {
  const prompt = `Kamu adalah seorang pendeta yang berpengalaman dan memahami Alkitab dengan baik. 

Buatkan satu doa untuk memulai, menjalankan atau menghadapi hari ini pada tanggal ${date} dengan seed: ${seed.substring(
    0,
    8
  )}.

Syarat:
1. Berikan doa dalam bahasa Indonesia
2. Doa yang dapat bermanfaat bagi pembaca
3. Jangan memasukkan tanggal ke dalam doa

Format response dalam JSON:
{
  "prayer": "Doa nya disini"
}

Pastikan doa yang diberikan dapat bermanfaat bagi pembaca.`;

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
    prayer: parsedResponse.prayer,
    date: date,
    generated_at: new Date().toISOString(),
  };
}

function getFallbackPrayer(date: string): DailyPrayData {
  return {
    prayer:
      "Tuhan Yesus, terima kasih atas hari yang Engkau berikan. Berkatilah setiap langkah yang akan kami ambil hari ini. Pimpinlah kami dalam jalan yang benar dan berikan kami kekuatan untuk menghadapi setiap tantangan. Dalam nama Yesus kami berdoa. Amin.",
    date: date,
    generated_at: new Date().toISOString(),
  };
}

async function getOrCreateDailyPrayer(
  request: NextRequest,
  period: string
): Promise<DailyPrayData> {
  const supabase = await createClient();

  try {
    // Cek apakah sudah ada doa untuk periode ini
    const { data: existingPrayer, error: fetchError } = await supabase
      .from("daily_prayers")
      .select("*")
      .eq("date", period)
      .single();

    if (existingPrayer && !fetchError) {
      return {
        prayer: existingPrayer.prayer,
        date: existingPrayer.date,
        generated_at: existingPrayer.created_at,
      };
    }

    // Generate doa baru jika belum ada
    const seed = generateDeterministicSeed(period);
    let prayer: DailyPrayData;

    try {
      prayer = await generatePrayWithAI(seed, period);
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      prayer = getFallbackPrayer(period);
    }

    // Simpan ke database
    const { error: insertError } = await supabase.from("daily_prayers").insert({
      date: prayer.date,
      prayer: prayer.prayer,
      seed: seed,
    });

    if (insertError) {
      console.error("Failed to save prayer to database:", insertError);
      // Tetap return prayer meskipun gagal save ke DB
    }

    return prayer;
  } catch (error) {
    console.error("Database error:", error);
    // Fallback jika ada masalah dengan database
    return getFallbackPrayer(period);
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
    const prayer = await getOrCreateDailyPrayer(request, currentPeriod);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily prayer retrieved successfully",
      data: prayer,
      meta: {
        cached: true,
        seed: generateDeterministicSeed(currentPeriod).substring(0, 8),
        next_update: getNextUpdateTime(),
      },
    });
  } catch (error) {
    console.error("Daily prayer API error:", error);

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

    // Hapus doa yang sudah ada untuk periode ini
    await supabase.from("daily_prayers").delete().eq("date", currentPeriod);

    // Generate doa baru
    const prayer = await getOrCreateDailyPrayer(request, currentPeriod);

    return NextResponse.json<ApiResponse>({
      status_code: 200,
      success: true,
      message: "Daily prayer refreshed successfully",
      data: prayer,
      meta: {
        cached: false,
        seed: generateDeterministicSeed(currentPeriod).substring(0, 8),
        next_update: getNextUpdateTime(),
      },
    });
  } catch (error) {
    console.error("Daily prayer POST error:", error);

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
