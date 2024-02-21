'use client';

import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
export default function Home() {
  const [ayatquote, setAyatQuote] = useState<ayatQuote>({});
  useEffect(() => {
    fetch("/api/alkitab/daily")
      .then((res) => res.json())
      .then((data) => {
        setAyatQuote(data);
      });
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <section className="hero min-h-[80vh]" style={{ backgroundImage: 'url(./hero.jpg)' }}>
          <div className="hero-overlay bg-opacity-60 backdrop-blur-sm"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Alkitab.com</h1>
              <p className="mb-5">Bersama Firman: Temukan Kekuatan dan Kebijaksanaan di Setiap Langkah Anda</p>
              <button className="btn btn-primary btn-wide">Mulai telusuri</button>
            </div>
          </div>
        </section>
        <section className="px-4 py-32 flex items-center justify-center">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold pb-10">
              Yang bisa Anda lakukan di Alkitab.com
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card shadow-sm border group hover:bg-blue-500 hover:shadow-xl transition-all ease-linear">
                <div className="card-body">
                  <h2 className="card-title group-hover:text-white">Baca alkitab</h2>
                  <p className="text-gray-500 group-hover:text-gray-300">
                    Baca Alkitab dalam berbagai versi bahasa dan terjemahan
                  </p>
                </div>
              </div>
              <div className="card shadow-sm border group hover:bg-blue-500 hover:shadow-xl transition-all ease-linear">
                <div className="card-body">
                  <h2 className="card-title group-hover:text-white">Ayat Harian</h2>
                  <p className="text-gray-500 group-hover:text-gray-300">
                    Dapatkan ayat harian untuk memulai hari Anda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ backgroundImage: 'url(https://i.pinimg.com/564x/0c/9f/06/0c9f06db27bdad7d97be5c5a43b0e1f2.jpg)' }} className="hero after:w-full after:h-full after:bg-black/80 after:absolute relative px-4 py-48 flex items-center justify-center">
          <div className="z-[200] max-w-4xl border-l-4 rounded-md backdrop-blur-sm px-5">
            <h2 className="text-xl md:text-3xl text-gray-300 my-10">{ayatquote.bunyi}</h2>
            <p className="text-md md:text-2xl text-right text-gray-400">{ayatquote.ayat}</p>
          </div>
        </section>
      </main>
      <BottomNav />
      <Footer />
    </>
  );
}


type ayatQuote = {
  bunyi?: string;
  ayat?: string;
};