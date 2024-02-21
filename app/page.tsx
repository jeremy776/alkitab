import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="hero min-h-[80vh]" style={{ backgroundImage: 'url(./hero.jpg)' }}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Alkitab.com</h1>
              <p className="mb-5">Bersama Firman: Temukan Kekuatan dan Kebijaksanaan di Setiap Langkah Anda</p>
              <button className="btn btn-primary btn-wide">Mulai telusuri</button>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
      <Footer />
    </>
  );
}
