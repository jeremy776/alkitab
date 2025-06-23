"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { useState } from "react";

const TeamsPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Jeremy",
      role: "Frontend Developer",
      description:
        "Spesialis dalam pengembangan antarmuka pengguna yang responsif dan interaktif. Berpengalaman dalam React, Next.js, dan teknologi frontend modern.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      experience: "5+ tahun",
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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Angga",
      role: "Backend Developer",
      description:
        "Ahli dalam pengembangan server-side dan arsitektur sistem. Menguasai berbagai teknologi backend dan database management.",
      skills: ["Node.js", "Express", "MongoDB"],
      experience: "6+ tahun",
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
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Wahyu",
      role: "UI/UX Designer",
      description:
        "Desainer berpengalaman yang fokus pada user experience dan visual design. Menciptakan antarmuka yang intuitif dan menarik secara visual.",
      skills: ["Figma"],
      experience: "4+ tahun",
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21a4 4 0 004-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4"
          />
        </svg>
      ),
      gradient: "from-green-500 to-blue-500",
    },
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
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              Tentang Tim Kami
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150">
              Kami adalah tim profesional yang berdedikasi untuk menciptakan
              solusi digital terbaik. Dengan keahlian yang beragam dan semangat
              kolaborasi, kami siap mewujudkan visi Anda menjadi kenyataan.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Misi Kami</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Memberikan solusi teknologi yang inovatif dan berkualitas tinggi
                untuk membantu bisnis berkembang di era digital. Kami
                berkomitmen untuk menciptakan pengalaman pengguna yang luar
                biasa melalui desain yang thoughtful dan teknologi yang
                reliable.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 animate-in fade-in-0 slide-in-from-right-4 duration-700 delay-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Visi Kami</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Menjadi tim pengembangan terdepan yang dikenal karena inovasi,
                kualitas, dan dedikasi dalam menciptakan solusi digital yang
                mengubah cara orang berinteraksi dengan teknologi. Kami ingin
                memberikan dampak positif melalui setiap proyek yang kami
                kerjakan.
              </p>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Kenali tim profesional di balik setiap proyek yang kami kerjakan
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`bg-white rounded-3xl p-8 border border-gray-100 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer animate-in fade-in-0 slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${700 + index * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(member.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${
                        member.gradient
                      } rounded-full mb-4 text-white transition-transform duration-300 ${
                        hoveredCard === member.id ? "scale-110" : ""
                      }`}
                    >
                      {member.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p
                      className={`text-lg font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Keahlian:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-gray-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center justify-center pt-4 border-t border-gray-100">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                      {member.experience} pengalaman
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1000">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Nilai-Nilai Kami
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Inovasi
                </h3>
                <p className="text-gray-600">
                  Selalu mencari solusi kreatif dan teknologi terdepan untuk
                  setiap tantangan.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Kolaborasi
                </h3>
                <p className="text-gray-600">
                  Bekerja sama dengan harmonis untuk mencapai hasil terbaik bagi
                  setiap proyek.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Kualitas
                </h3>
                <p className="text-gray-600">
                  Berkomitmen untuk memberikan hasil kerja dengan standar
                  kualitas tertinggi.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Siap Berkolaborasi dengan Kami?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Mari berdiskusi tentang proyek Anda dan bagaimana kami dapat
              membantu mewujudkan visi digital Anda.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg
                className="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TeamsPage;
