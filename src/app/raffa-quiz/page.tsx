"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Clock,
  Brain,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const quizData = [
  {
    "id": 1,
    "question": "Ibukota negara Jepang adalah?",
    "options": ["Osaka", "Kyoto", "Tokyo", "Nagoya"],
    "correct": 2,
    "explanation": "Tokyo adalah ibukota Jepang dan salah satu kota terpadat di dunia."
  },
  {
    "id": 2,
    "question": "Apa simbol kimia untuk unsur Emas?",
    "options": ["Au", "Ag", "Fe", "Cu"],
    "correct": 0,
    "explanation": "Simbol kimia Emas adalah Au, berasal dari kata Latin 'Aurum'."
  },
  {
    "id": 3,
    "question": "Siapa presiden pertama Indonesia?",
    "options": ["Soeharto", "BJ Habibie", "Ir. Soekarno", "Megawati"],
    "correct": 2,
    "explanation": "Ir. Soekarno adalah presiden pertama Indonesia, menjabat sejak 1945."
  },
  {
    "id": 4,
    "question": "Berapa jumlah sisi pada kubus?",
    "options": ["4", "6", "8", "12"],
    "correct": 1,
    "explanation": "Kubus memiliki 6 sisi yang berbentuk persegi."
  },
  {
    "id": 5,
    "question": "Planet manakah yang disebut 'planet merah'?",
    "options": ["Venus", "Mars", "Jupiter", "Merkurius"],
    "correct": 1,
    "explanation": "Mars disebut planet merah karena permukaannya mengandung banyak besi oksida."
  },
  {
    "id": 6,
    "question": "Bahasa pemrograman manakah yang paling umum digunakan untuk web frontend?",
    "options": ["Python", "Java", "JavaScript", "C++"],
    "correct": 2,
    "explanation": "JavaScript adalah bahasa utama untuk membangun tampilan website interaktif."
  },
  {
    "id": 7,
    "question": "Gunung tertinggi di Indonesia adalah?",
    "options": ["Semeru", "Rinjani", "Jayawijaya", "Kerinci"],
    "correct": 2,
    "explanation": "Gunung Jayawijaya (Puncak Jaya) adalah gunung tertinggi di Indonesia, terletak di Papua."
  },
  {
    "id": 8,
    "question": "Apa nama zat yang dibutuhkan tumbuhan untuk fotosintesis?",
    "options": ["Karbon dioksida", "Nitrogen", "Oksigen", "Karbohidrat"],
    "correct": 0,
    "explanation": "Tumbuhan memerlukan karbon dioksida, air, dan cahaya matahari untuk fotosintesis."
  },
  {
    "id": 9,
    "question": "Siapakah penemu bola lampu pijar?",
    "options": ["Alexander Graham Bell", "Isaac Newton", "Albert Einstein", "Thomas Edison"],
    "correct": 3,
    "explanation": "Thomas Edison dikenal sebagai penemu bola lampu pijar yang dapat bertahan lama."
  },
  {
    "id": 10,
    "question": "Negara manakah yang memiliki bendera merah-putih horizontal?",
    "options": ["Indonesia", "Polandia", "Monako", "Austria"],
    "correct": 1,
    "explanation": "Polandia memiliki bendera merah-putih dengan susunan horizontal, merah di bawah."
  },
  {
    "id": 11,
    "question": "Apa satuan untuk mengukur kekuatan arus listrik?",
    "options": ["Volt", "Watt", "Ampere", "Ohm"],
    "correct": 2,
    "explanation": "Ampere digunakan untuk mengukur kekuatan arus listrik."
  },
  {
    "id": 12,
    "question": "Dalam sistem periodik unsur, golongan mana yang dikenal sebagai gas mulia?",
    "options": ["Golongan I", "Golongan II", "Golongan VII", "Golongan VIII"],
    "correct": 3,
    "explanation": "Golongan VIII A adalah gas mulia seperti helium, neon, dan argon."
  },
  {
    "id": 13,
    "question": "Siapa penulis naskah proklamasi kemerdekaan Indonesia?",
    "options": ["Sukarno", "Sjahrir", "Sutan Sjahrir", "Moh. Hatta"],
    "correct": 0,
    "explanation": "Teks proklamasi ditulis oleh Sukarno dan diketik oleh Sayuti Melik."
  },
  {
    "id": 14,
    "question": "Alat musik tradisional 'angklung' berasal dari daerah?",
    "options": ["Jawa Tengah", "Bali", "Sumatera Barat", "Jawa Barat"],
    "correct": 3,
    "explanation": "Angklung berasal dari Jawa Barat dan terbuat dari bambu."
  },
  {
    "id": 15,
    "question": "Apa nama ilmiah dari air?",
    "options": ["CO2", "H2O", "NaCl", "O2"],
    "correct": 1,
    "explanation": "Air terdiri dari dua atom hidrogen dan satu atom oksigen, yaitu H2O."
  },
  {
    "id": 16,
    "question": "Berapakah hasil dari 5! (faktorial 5)?",
    "options": ["60", "120", "100", "80"],
    "correct": 1,
    "explanation": "5! = 5×4×3×2×1 = 120."
  },
  {
    "id": 17,
    "question": "Kapan Indonesia merdeka?",
    "options": ["1944", "1945", "1946", "1950"],
    "correct": 1,
    "explanation": "Indonesia merdeka pada 17 Agustus 1945."
  },
  {
    "id": 18,
    "question": "Siapakah penemu teori relativitas?",
    "options": ["Nikola Tesla", "Isaac Newton", "Albert Einstein", "Galileo Galilei"],
    "correct": 2,
    "explanation": "Albert Einstein dikenal karena teori relativitas yang merevolusi fisika."
  },
  {
    "id": 19,
    "question": "Laut terdalam di dunia adalah?",
    "options": ["Laut Merah", "Laut Cina Selatan", "Palung Mariana", "Laut Jepang"],
    "correct": 2,
    "explanation": "Palung Mariana adalah titik terdalam lautan di dunia, terletak di Samudra Pasifik."
  },
  {
    "id": 20,
    "question": "Apa nama alat untuk mengukur suhu?",
    "options": ["Higrometer", "Barometer", "Termometer", "Altimeter"],
    "correct": 2,
    "explanation": "Termometer digunakan untuk mengukur suhu tubuh atau lingkungan."
  },
  {
    "id": 21,
    "question": "Apa nama planet terbesar di Tata Surya?",
    "options": ["Saturnus", "Neptunus", "Jupiter", "Uranus"],
    "correct": 2,
    "explanation": "Jupiter adalah planet terbesar di Tata Surya."
  },
  {
    "id": 22,
    "question": "Siapa pelukis terkenal dari Italia yang membuat lukisan Mona Lisa?",
    "options": ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    "correct": 1,
    "explanation": "Mona Lisa dilukis oleh Leonardo da Vinci pada abad ke-16."
  },
  {
    "id": 23,
    "question": "Apa ibu kota provinsi Sumatera Utara?",
    "options": ["Medan", "Padang", "Pekanbaru", "Palembang"],
    "correct": 0,
    "explanation": "Medan adalah ibu kota dari provinsi Sumatera Utara."
  },
  {
    "id": 24,
    "question": "Siapakah penulis novel 'Laskar Pelangi'?",
    "options": ["Andrea Hirata", "Tere Liye", "Habiburrahman El Shirazy", "Dewi Lestari"],
    "correct": 0,
    "explanation": "Andrea Hirata menulis novel 'Laskar Pelangi' berdasarkan kisah masa kecilnya."
  },
  {
    "id": 25,
    "question": "Berapakah sudut dalam pada segitiga sama sisi?",
    "options": ["30°", "45°", "60°", "90°"],
    "correct": 2,
    "explanation": "Setiap sudut dalam segitiga sama sisi adalah 60°."
  },
  {
    "id": 26,
    "question": "Siapa nama penemu telepon?",
    "options": ["Thomas Edison", "Alexander Graham Bell", "James Watt", "Nikola Tesla"],
    "correct": 1,
    "explanation": "Alexander Graham Bell dikenal sebagai penemu telepon."
  },
  {
    "id": 27,
    "question": "Apa nama zat pewarna alami dari tumbuhan yang digunakan dalam batik?",
    "options": ["Temulawak", "Indigo", "Kayu manis", "Jati"],
    "correct": 1,
    "explanation": "Indigo adalah pewarna biru alami yang sering dipakai dalam batik."
  },
  {
    "id": 28,
    "question": "Bahasa resmi PBB berikut ini, kecuali?",
    "options": ["Arab", "Spanyol", "Portugis", "Cina"],
    "correct": 2,
    "explanation": "Bahasa resmi PBB adalah Arab, Inggris, Perancis, Rusia, Spanyol, dan Mandarin. Portugis tidak termasuk."
  },
  {
    "id": 29,
    "question": "Negara manakah yang dikenal sebagai negeri tirai bambu?",
    "options": ["Korea", "Vietnam", "Thailand", "Tiongkok"],
    "correct": 3,
    "explanation": "Tiongkok (China) sering disebut negeri tirai bambu."
  },
  {
    "id": 30,
    "question": "Berapakah volume sebuah kubus dengan panjang sisi 5 cm?",
    "options": ["25 cm³", "100 cm³", "125 cm³", "150 cm³"],
    "correct": 2,
    "explanation": "Volume kubus = sisi × sisi × sisi = 5×5×5 = 125 cm³."
  },
  {
    "id": 31,
    "question": "Siapa tokoh utama dalam epos Mahabharata yang dikenal sebagai pemanah ulung?",
    "options": ["Bhima", "Yudistira", "Arjuna", "Duryodana"],
    "correct": 2,
    "explanation": "Arjuna adalah tokoh pemanah utama dalam Mahabharata."
  },
  {
    "id": 32,
    "question": "Di mana letak jantung manusia?",
    "options": ["Tengah dada", "Kiri atas dada", "Kanan bawah dada", "Kiri bawah dada"],
    "correct": 1,
    "explanation": "Jantung terletak di rongga dada agak ke kiri atas."
  },
  {
    "id": 33,
    "question": "Apa fungsi utama daun pada tumbuhan?",
    "options": ["Menyerap air", "Menyerap cahaya", "Melakukan fotosintesis", "Tempat menyimpan makanan"],
    "correct": 2,
    "explanation": "Daun adalah tempat utama terjadinya fotosintesis."
  },
  {
    "id": 34,
    "question": "Apa nama unsur dengan simbol 'Fe'?",
    "options": ["Fluorin", "Fosfor", "Fermium", "Besi"],
    "correct": 3,
    "explanation": "Simbol Fe berasal dari bahasa Latin 'Ferrum' yang berarti Besi."
  },
  {
    "id": 35,
    "question": "Apa alat musik tradisional dari Kalimantan yang dipukul?",
    "options": ["Tifa", "Sape", "Gendang", "Gambus"],
    "correct": 2,
    "explanation": "Gendang adalah alat musik pukul tradisional yang juga digunakan di Kalimantan."
  },
  {
    "id": 36,
    "question": "Apa nama alat optik untuk melihat benda sangat kecil?",
    "options": ["Teleskop", "Kamera", "Mikroskop", "Periskop"],
    "correct": 2,
    "explanation": "Mikroskop digunakan untuk melihat mikroorganisme dan benda kecil lainnya."
  },
  {
    "id": 37,
    "question": "Tari Kecak berasal dari daerah?",
    "options": ["Jawa Barat", "Bali", "Sumatera", "Kalimantan"],
    "correct": 1,
    "explanation": "Tari Kecak adalah tarian tradisional Bali yang populer di kalangan wisatawan."
  },
  {
    "id": 38,
    "question": "Negara manakah yang pertama kali mendaratkan manusia di Bulan?",
    "options": ["Rusia", "Amerika Serikat", "Tiongkok", "India"],
    "correct": 1,
    "explanation": "Amerika Serikat berhasil mendaratkan Neil Armstrong ke Bulan tahun 1969 melalui misi Apollo 11."
  },
  {
    "id": 39,
    "question": "Apa lambang dari bilangan tak hingga?",
    "options": ["∞", "π", "√", "∑"],
    "correct": 0,
    "explanation": "Simbol ∞ melambangkan tak hingga dalam matematika."
  },
  {
    "id": 40,
    "question": "Sungai terpanjang di dunia adalah?",
    "options": ["Amazon", "Nil", "Yangtze", "Mississippi"],
    "correct": 1,
    "explanation": "Sungai Nil di Afrika dianggap sebagai sungai terpanjang di dunia."
  },
  {
    "id": 41,
    "question": "Lambang sila pertama Pancasila adalah?",
    "options": ["Bintang", "Rantai", "Pohon Beringin", "Padi dan Kapas"],
    "correct": 0,
    "explanation": "Sila pertama: Ketuhanan Yang Maha Esa dilambangkan dengan bintang emas."
  },
  {
    "id": 42,
    "question": "Berapa jumlah provinsi di Indonesia setelah pemekaran Papua pada 2022?",
    "options": ["34", "36", "38", "40"],
    "correct": 2,
    "explanation": "Jumlah provinsi di Indonesia menjadi 38 setelah pemekaran Papua."
  },
  {
    "id": 43,
    "question": "Apa nama bagian otak yang mengatur keseimbangan?",
    "options": ["Otak besar", "Sumsum tulang belakang", "Otak tengah", "Otak kecil"],
    "correct": 3,
    "explanation": "Otak kecil (cerebellum) mengatur koordinasi gerak dan keseimbangan tubuh."
  },
  {
    "id": 44,
    "question": "Apa rumus luas segitiga?",
    "options": ["s × s", "½ × a × t", "p × l", "a² + b² = c²"],
    "correct": 1,
    "explanation": "Luas segitiga = ½ × alas × tinggi."
  },
  {
    "id": 45,
    "question": "Apa nama ibukota Australia?",
    "options": ["Sydney", "Melbourne", "Perth", "Canberra"],
    "correct": 3,
    "explanation": "Canberra adalah ibukota resmi Australia, bukan Sydney."
  },
  {
    "id": 46,
    "question": "Kapan Sumpah Pemuda diikrarkan?",
    "options": ["1926", "1927", "1928", "1929"],
    "correct": 2,
    "explanation": "Sumpah Pemuda diikrarkan pada 28 Oktober 1928."
  },
  {
    "id": 47,
    "question": "Siapakah tokoh perempuan pelopor pendidikan di Indonesia?",
    "options": ["Dewi Sartika", "Fatmawati", "RA Kartini", "Martha Christina"],
    "correct": 2,
    "explanation": "RA Kartini dikenal sebagai pelopor pendidikan bagi perempuan Indonesia."
  },
  {
    "id": 48,
    "question": "Apakah nama senyawa garam dapur dalam kimia?",
    "options": ["NaCl", "KCl", "NH3", "HCl"],
    "correct": 0,
    "explanation": "Garam dapur adalah natrium klorida dengan rumus kimia NaCl."
  },
  {
    "id": 49,
    "question": "Hewan apa yang dikenal memiliki kemampuan ekolokasi?",
    "options": ["Gajah", "Kucing", "Kelelawar", "Burung hantu"],
    "correct": 2,
    "explanation": "Kelelawar menggunakan ekolokasi untuk navigasi dan menangkap mangsa."
  },
  {
    "id": 50,
    "question": "Siapakah penemu komputer pertama kali?",
    "options": ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
    "correct": 1,
    "explanation": "Charles Babbage dikenal sebagai penemu komputer mekanik pertama pada abad ke-19."
  }

  // Masih 20 soal. Jika kamu ingin saya lanjutkan hingga 50, tinggal beri konfirmasi
]

export default function ChristianQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 10 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizComplete();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: any) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(false);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === quizData[currentQuestion].correct;
    const newAnswers = [
      ...answers,
      {
        questionId: quizData[currentQuestion].id,
        selected: selectedAnswer,
        correct: quizData[currentQuestion].correct,
        isCorrect: isCorrect,
      },
    ] as any;

    setAnswers(newAnswers);
    if (isCorrect) setScore(score + 1);

    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        handleQuizComplete();
      }
    }, 3000);
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(600);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 90)
      return "Luar biasa! Pengetahuan Alkitab Anda sangat baik! 🌟";
    if (percentage >= 80)
      return "Hebat! Anda memiliki pemahaman yang baik tentang Alkitab! 👏";
    if (percentage >= 70)
      return "Bagus! Terus belajar dan pelajari Firman Tuhan! 📖";
    if (percentage >= 60)
      return "Cukup baik! Luangkan waktu lebih untuk membaca Alkitab! 💪";
    return "Jangan menyerah! Mulai baca Alkitab secara rutin! 🙏";
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz Selesai!
            </h1>
            <p className="text-gray-600 mb-6">
              Terima kasih telah mengikuti Quiz Alkitab
            </p>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
              <div className="text-4xl font-bold mb-2">
                <span className={getScoreColor()}>{score}</span>
                <span className="text-2xl">/{quizData.length}</span>
              </div>
              <p className="text-lg opacity-90">
                {((score / quizData.length) * 100).toFixed(1)}% Benar
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-lg font-medium text-gray-700">
                {getScoreMessage()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="font-medium text-green-800">Benar: {score}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <XCircle className="w-5 h-5 text-red-600 mx-auto mb-1" />
                <p className="font-medium text-red-800">
                  Salah: {quizData.length - score}
                </p>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Ulangi Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gradient-to-br pb-20 from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">SeQuiz</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    {score}/{quizData.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Soal {currentQuestion + 1} dari {quizData.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((currentQuestion + 1) / quizData.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
                {quizData[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? showExplanation
                        ? index === quizData[currentQuestion].correct
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-red-500 bg-red-50 text-red-800"
                        : "border-blue-500 bg-blue-50 text-blue-800"
                      : showExplanation &&
                        index === quizData[currentQuestion].correct
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                  } ${
                    showExplanation
                      ? "cursor-default"
                      : "cursor-pointer hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showExplanation &&
                      (index === quizData[currentQuestion].correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : null)}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-xl">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Penjelasan:
                </h3>
                <p className="text-blue-700">
                  {quizData[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Pilih jawaban yang menurut Anda benar
              </div>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null || showExplanation}
                className={`font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                  selectedAnswer !== null && !showExplanation
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {currentQuestion === quizData.length - 1 ? "Selesai" : "Lanjut"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
                                                 }
