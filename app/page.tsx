
import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import DailyQuote from "@/components/dailyQuote";
import { Router, useRouter } from "next/router";
import BacaAlkitab from "@/components/BacaAlkitab";
import LaguRohani from "@/components/LaguRohani";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero min-h-[80vh]" style={{ backgroundImage: 'url(./hero.jpg)' }}>
          <div className="hero-overlay bg-opacity-60 backdrop-blur-sm"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">HolyVerse</h1>
              <p className="mb-5">Temukan HolyVerse: Sumber Anda untuk Pemuliaan Rohani dan Keselarasan</p>
              <button className="btn btn-primary btn-wide">Mulai telusuri</button>
            </div>
          </div>
        </section>
        <section className="px-4 py-32 flex items-center justify-center">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold pb-10">
              Yang bisa Anda lakukan di HolyVerse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <BacaAlkitab />
              <div className="card shadow-sm border group hover:bg-blue-500 hover:shadow-xl transition-all ease-linear">
                <div className="card-body">
                  <h2 className="card-title group-hover:text-white">Ayat Harian</h2>
                  <p className="text-gray-500 group-hover:text-gray-300">
                    Dapatkan ayat harian untuk memulai hari Anda
                  </p>
                </div>
              </div>
              <LaguRohani />
            </div>
          </div>
        </section>
        <section style={{ backgroundImage: 'url(https://i.pinimg.com/564x/0c/9f/06/0c9f06db27bdad7d97be5c5a43b0e1f2.jpg)' }} className="hero after:w-full after:h-full after:bg-black/80 after:absolute relative px-4 py-48 flex items-center justify-center">
          <DailyQuote />
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