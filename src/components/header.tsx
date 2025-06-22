import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white py-20 px-6 text-gray-900">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div>
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            ✨ New in 2025
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Waktunya Sela.
            <br />
            Vibes-nya Kamu.
          </h1>

          <p className="text-lg text-gray-600 mb-6 max-w-xl">
            SelaVibes bantu kamu connect sama Tuhan lewat lagu, ayat, dan fun
            facts yang relatable banget.
          </p>

          <ul className="text-sm text-gray-700 mb-8 space-y-2">
            <li className="flex items-center gap-2">
              ✅ Lagu-lagu rohani keren siap diputar kapan aja
            </li>
            <li className="flex items-center gap-2">
              ✅ Ayat harian dengan vibe kekinian
            </li>
            <li className="flex items-center gap-2">
              ✅ Fun trivia & quotes yang nancep di hati
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            {/* Uncomment these buttons if needed */}
            {/* <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              📖 Ayo Teduh Yuk
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              📺 Watch Demo
            </button> */}
          </div>
        </div>

        {/* Right: Image with Overlay */}
        <div className="relative hidden lg:block">
          <Image
            src="/hero.png"
            alt="Builder preview"
            width={600}
            height={400}
            className="rounded-xl"
            priority
          />

          {/* Overlay Badge */}
          <div className="absolute top-4 left-4 bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow">
            SaTe Bareng
          </div>
        </div>
      </div>
    </header>
  );
}