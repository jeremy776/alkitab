import { NextResponse } from "next/server";

// Jika `gpti` tidak memiliki deklarasi TypeScript, gunakan require
const { gpt } = require("gpti");

const messages = [
  {
    role: "user",
    content: `Kamu adalah sebuah AI yang mempelajari tentang teologia, dan sudah mendekati untuk menjadi pendeta.
    sekarnag tolong berikan aku satu ayat Alkitab secara acak hari ini yang bisa memberi semangat. Sertakan:
- Referensi ayat (misalnya Yohanes 3:16, Yohanes 8:12, Roma 12:2,Roma 15:13,1 Petrus 1:21, 2 Korintus 4:17, Matius 11:28, 1 Petrus 5:7)
- Isi lengkap ayatnya

Pelajari juga ayat ayat yang ada pada kitab Amsal karena disana banyak kata kata yang cocok...,
Pilih ayat ayat yang berhubungan dengan penyemangat harian, penyemangat ketika putus cinta, dan lain lain. contoh respon nya yang saya harapkan adalah dalam bentuk yang mudah di validasi dalam regEx agar saya bisa membaca nya`,
  }
];

export async function GET() {
  try {
    const data = await gpt.v1({
      messages: messages,
      prompt: "Berikan aku ayat harian secara acak",
      model: "GPT-4",
      markdown: false,
    });

    return NextResponse.json({ result: data });
  } catch (error: any) {
    console.error("GPTI Error:", error);
    return NextResponse.json(
      { error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
