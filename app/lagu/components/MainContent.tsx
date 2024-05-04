import Footer from "@/components/footer";

export default async function MainContent() {
  let data = await fetch("https://alkitab-ecru.vercel.app/api/songs", {
    cache: "no-cache",
  });
  let songList = await data.json();
  const bukuLagu = songList.body;
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Lagu Rohani</h2>
          <p className="mt-3">Holy Verse {'[Song]'} adalah aplikasi yang berisi kumpulan lirik lagu rohani Kristen.
            Aplikasi ini bertujuan untuk memudahkan umat Kristen dalam mempelajari
            lirik lagu rohani Kristen yang sering dinyanyikan di gereja.
            Aplikasi ini juga menyediakan fitur pencarian lagu berdasarkan judul lagu,
            lirik lagu.
          </p>
          <label className="shadow-xl input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Cari lagu rohani" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </div>
        <div className="flex items-center justify-center w-full">
          <img src="gereja.svg" className="w-80 h-80 drop-shadow-[0_0px_50px_rgba(20,205,200,0.19)]" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 pt-56 gap-6">
        <div className="">
          <h2 className="text-4xl font-bold">Daftar Lagu</h2>
          <p>Berikut ini adalah daftar lagu yang tersedia dalam Holy Verse Song. Kamu juga bisa request loh mau menambahkan lagu apa lagi yang belum tersedia disini</p>
        </div>
        <div className="space-y-4">
          {bukuLagu.slice(0, 3).map((title: any, index: number) => {
            return (
              <div key={index} className="hover:bg-emerald-600 hover:shadow-emerald-500 hover:shadow-lg cursor-pointer group transition-all ease-in shadow-lg card">
                <div className="card-body">
                  <h2 className="card-title group-hover:text-white">Hidup Ini Adalah Kesempatan</h2>
                  <p className="group-hover:text-gray-200">Herlin Pirena</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid pt-60 gap-8">
        <div className="">
          <h2 className="text-4xl font-bold">Daftar Buku Lagu</h2>
          <p>Berikut ini adalah daftar buku lagu yang tersedia dalam Alkitab App. seluruh lagu ini diambil dari Alkitab App</p>
        </div>
        <div className="2xl:grid-cols-8 grid-cols-2 md:grid-cols-5 sm:grid-cols-3 lg:grid-cols-6 gap-8 grid">
          {bukuLagu.map((title: any, index: number) => {
            return (
              <div key={index} className="rounded-lg py-6 hover:bg-blue-600 hover:shadow-blue-500 hover:shadow-lg cursor-pointer group transition-all ease-in shadow-md">
                <div className="text-center">
                  <h2 className="group-hover:text-white text-center">{title.title[0]}</h2>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}