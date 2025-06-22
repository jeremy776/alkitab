export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl text-gray-700 font-bold mb-4">
          📖 Ayat Harian yang Relatable
        </h2>
        <p className="text-gray-600 mb-12">
          Setiap hari kamu bakal dapet satu ayat yang nancep di hati—gak
          terlalu panjang, tapi kena banget.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-indigo-600 font-semibold mb-2">
              🙏 Doa Harian Biar Gak Lupa Ngobrol Sama Tuhan
            </h3>
            <p className="text-sm text-gray-600">
              Doa singkat yang bisa kamu baca atau dengerin kapan aja. Cocok
              buat nemenin pagi, istirahat, atau sebelum tidur.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-indigo-600 font-semibold mb-2">
              🎵 Playlist Rohani Bikin Hati Adem
            </h3>
            <p className="text-sm text-gray-600">
              Kumpulan lagu-lagu rohani kekinian yang bisa kamu putar biar
              suasana hati makin tenang dan positif.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-indigo-600 font-semibold mb-2">
              🧠 Tes Kepribadian Alkitabiah
            </h3>
            <p className="text-sm text-gray-600">
              Yuk kenalan sama dirimu dari sudut pandang Alkitab—fun dan
              insightful banget!
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-indigo-600 font-semibold mb-2">
              💬 Komunitas yang Saling Menguatkan
            </h3>
            <p className="text-sm text-gray-600">
              (Coming Soon) Tempat buat saling berbagi berkat, cerita, dan
              doa. Karena iman itu makin kuat kalau jalan bareng 🙌
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}