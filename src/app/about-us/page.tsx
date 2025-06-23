"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useState } from "react";

const AboutSelaVibesPage = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "Renungan Harian",
      description:
        "Renungan singkat dan aplikatif yang relevan dengan kehidupan sehari-hari anak muda masa kini, dipersonalisasi dengan AI",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      aiFeature: "AI memahami konteks hidupmu dan memberikan renungan yang sesuai dengan situasi dan kebutuhanmu"
    },
    {
      id: 2,
      title: "Playlist Rohani",
      description:
        "Koleksi musik rohani yang menenangkan dan membangun semangat untuk setiap momen, dikurasi cerdas oleh AI",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      aiFeature: "AI merekomendasikan lagu berdasarkan mood, aktivitas, dan perjalanan spiritual personalmu"
    },
    {
      id: 3,
      title: "Ayat Harian",
      description:
        "Ayat Alkitab pilihan dan kutipan inspiratif yang mudah dibagikan, dipilih khusus untukmu oleh AI",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      gradient: "from-green-500 to-blue-500",
      aiFeature: "AI menganalisis kebutuhanmu dan memberikan ayat yang tepat untuk setiap situasi hidup"
    },
  ];

  const values = [
    {
      title: "Relatable",
      description:
        "Konten yang dekat dengan kehidupan anak muda, tidak kaku atau formal",
      icon: "🤝",
    },
    {
      title: "Authentic",
      description:
        "Pesan rohani yang tulus dan jujur, seperti berbagi dengan sahabat",
      icon: "✨",
    },
    {
      title: "Inspiring",
      description:
        "Memberikan semangat dan inspirasi untuk menjalani hidup dengan purpose",
      icon: "🌟",
    },
    {
      title: "Smart",
      description:
        "Didukung AI yang memahami kebutuhanmu dan memberikan pengalaman yang personal",
      icon: "🧠",
    },
  ];

  const aiFeatures = [
    {
      title: "Personalisasi Cerdas",
      description: "AI memahami journey spiritual unikmu dan menyesuaikan konten sesuai kebutuhan dan tahap pertumbuhanmu",
      icon: "🎯",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: "Analisis Mood",
      description: "Teknologi AI mengenali suasana hati dan kondisi emosimu untuk memberikan dukungan yang tepat waktu",
      icon: "💭",
      gradient: "from-blue-500 to-teal-500"
    },
    {
      title: "Rekomendasi Kontekstual",
      description: "AI memberikan saran konten, aktivitas, dan refleksi berdasarkan situasi hidup yang sedang kamu alami",
      icon: "🔍",
      gradient: "from-green-500 to-cyan-500"
    },
    {
      title: "Chatbot Rohani",
      description: "Teman chat AI yang siap mendengarkan keluh kesahmu dan memberikan perspektif rohani kapan saja",
      icon: "💬",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200 opacity-20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-200 opacity-20 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-pink-200 opacity-20 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <span className="text-3xl">🙏</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              SelaVibes
            </h1>

            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-2xl md:text-3xl text-gray-700 font-medium mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150">
                <span className="text-blue-600 font-bold">Sela</span> +{" "}
                <span className="text-purple-600 font-bold">Vibes</span> +{" "}
                <span className="text-indigo-600 font-bold">AI</span>
              </p>
              <p className="text-lg text-gray-600 leading-relaxed animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
                Momen hening dan refleksi rohani yang disampaikan dalam suasana
                hangat, relatable, dan penuh vibes positif. Aplikasi rohani berbasis AI yang 
                dibuat khusus untuk anak muda zaman sekarang dengan pengalaman yang personal dan cerdas.
              </p>
            </div>

            {/* App Description Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Apa itu SelaVibes?
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    <strong>"Sela"</strong> berasal dari istilah dalam Alkitab
                    yang berarti <em>berhenti sejenak dan renungkan</em>,
                    sedangkan <strong>"Vibes"</strong> merujuk pada suasana
                    positif yang akrab di kalangan Gen Z dan milenial.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    SelaVibes hadir sebagai teman spiritual yang tidak kaku,
                    personal, dan nyaman - seperti mendengar sahabat bercerita
                    tentang perjalanan rohaninya. <strong>Didukung teknologi AI</strong> yang 
                    memahami kebutuhanmu dan memberikan pengalaman yang benar-benar personal.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                    <div className="text-6xl">🤖✨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Powered Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powered by AI
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                SelaVibes menggunakan kecerdasan buatan untuk memahami perjalanan spiritualmu secara personal. 
                Setiap fitur dirancang untuk memberikan pengalaman yang relevan, tepat waktu, dan bermakna untukmu.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-6 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl animate-in fade-in-0 slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full mb-4 text-white text-2xl`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-1400">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Misi Kami</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Menyajikan konten rohani Kristen yang relevan, mudah dipahami,
                dan aplikatif untuk kehidupan anak muda masa kini. Kami ingin
                menjembatani gap antara nilai-nilai kekristenan yang kekal
                dengan bahasa dan pendekatan yang contemporary, <strong>diperkuat dengan teknologi AI</strong> 
                untuk pengalaman yang lebih personal dan bermakna.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-1600">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Visi Kami</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform digital terdepan yang menginspirasi generasi
                muda untuk menjalani hidup yang bermakna dan beriman. Kami
                percaya bahwa spiritualitas tidak harus membosankan - dengan dukungan AI, 
                ia bisa menjadi sumber kekuatan dan kegembiraan yang personal dalam kehidupan
                sehari-hari.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Fitur Utama SelaVibes
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dirancang khusus untuk mendukung perjalanan spiritual anak muda
                dengan cara yang fun, meaningful, dan dipersonalisasi oleh AI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`bg-white rounded-3xl p-8 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${1800 + index * 200}ms` }}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${
                        feature.gradient
                      } rounded-full mb-6 text-white transition-transform duration-300 ${
                        activeFeature === feature.id ? "scale-110" : ""
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">🤖</span>
                        <span className="text-sm font-semibold text-indigo-700">AI Feature</span>
                      </div>
                      <p className="text-xs text-indigo-600 leading-relaxed">
                        {feature.aiFeature}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-2400">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Prinsip-prinsip yang menjadi fondasi dalam setiap konten dan
                fitur yang kami hadirkan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-2600">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">👥</span>
                Untuk Siapa?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Gen Z dan Milenial Kristen
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Anak muda yang mencari spiritualitas yang relevan
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Mereka yang ingin grow dalam iman dengan cara yang fun
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Komunitas yang menghargai authenticity dan personalisasi
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-2800">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">💡</span>
                Mengapa SelaVibes?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Konten yang tidak menggurui, tapi menginspirasi
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Bahasa yang akrab dan mudah dipahami
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Pengalaman yang dipersonalisasi oleh AI
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">
                    Komunitas yang supportive dan inclusive
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border-l-4 border-blue-500 mb-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-3000">
            <div className="text-center">
              <div className="text-6xl mb-6">💭</div>
              <blockquote className="text-2xl md:text-3xl text-blue-800 italic font-medium mb-6">
                "Berhentilah sejenak, dengarkan hatimu, dan rasakan kehadiran
                Tuhan dalam setiap momen - dengan dukungan AI yang memahami perjalananmu"
              </blockquote>
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <span className="text-2xl mr-2">🤖</span>
                  Filosofi SelaVibes AI
                </span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-3200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Feel the Vibes? ✨
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join ribuan anak muda yang sudah merasakan pengalaman spiritual
              yang berbeda dengan SelaVibes. Rasakan bagaimana AI memahami dan mendukung 
              perjalanan rohanimu secara personal. Mulai perjalananmu hari ini!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-full font-semibold border border-gray-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[200px]">
                <span className="text-xl mr-2">👥</span>
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutSelaVibesPage;