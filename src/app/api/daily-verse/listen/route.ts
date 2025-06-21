import { NextResponse } from 'next/server';
import googleTTS from 'google-tts-api';

export async function GET() {
  try {
    // Ambil teks dari endpoint internal
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/daily-verse`);
    const data = await res.json();

    const text = adjustPronunciation(data.data?.text);
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid verse text' }, { status: 400 });
    }

    // Gunakan getAllAudioUrls untuk teks panjang
    const urls = await googleTTS.getAllAudioUrls(text, {
      lang: 'id',
      slow: false,
      host: 'https://translate.google.com',
    });

    // Ambil semua bagian audio
    const audioBuffers = await Promise.all(
      urls.map(async (item) => {
        const res = await fetch(item.url);
        return await res.arrayBuffer();
      })
    );

    // Gabungkan semua buffer menjadi satu
    const totalLength = audioBuffers.reduce((sum, b) => sum + b.byteLength, 0);
    const mergedBuffer = new Uint8Array(totalLength);
    let offset = 0;

    for (const buffer of audioBuffers) {
      mergedBuffer.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }

    return new NextResponse(mergedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="daily-verse.mp3"',
      },
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'Failed to generate TTS' }, { status: 500 });
  }
}


function adjustPronunciation(text: string): string {
  return text.replace(/\bAllah\b/gi, 'A llah');
}
