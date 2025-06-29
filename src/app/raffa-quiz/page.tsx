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
    "question": "Organ tubuh manusia yang berfungsi untuk memompa darah ke seluruh tubuh adalah?",
    "options": ["Paru-paru", "Lambung", "Usus", "Jantung"],
    "correct": 3,
    "explanation": "Jantung memompa darah ke seluruh tubuh."
  },
  {
    "id": 2,
    "question": "Bagian tumbuhan yang berfungsi menyerap air dan mineral dari tanah adalah?",
    "options": ["Batang", "Akar", "Daun", "Bunga"],
    "correct": 1,
    "explanation": "Akar menyerap air dan mineral dari tanah."
  },
  {
    "id": 3,
    "question": "Alat optik yang digunakan untuk melihat benda-benda kecil adalah?",
    "options": ["Teleskop", "Mikroskop", "Kamera", "Kaca pembesar"],
    "correct": 1,
    "explanation": "Mikroskop digunakan untuk melihat benda mikroskopis."
  },
  {
    "id": 4,
    "question": "Zat yang dapat menghantarkan listrik dengan baik disebut?",
    "options": ["Isolator", "Konduktor", "Semikonduktor", "Plastik"],
    "correct": 1,
    "explanation": "Konduktor menghantarkan listrik dengan baik, misalnya logam."
  },
  {
    "id": 5,
    "question": "Hewan berikut ini termasuk hewan ovipar, kecuali?",
    "options": ["Ayam", "Ikan", "Kucing", "Burung"],
    "correct": 2,
    "explanation": "Kucing berkembang biak dengan melahirkan (vivipar)."
  },
  {
    "id": 6,
    "question": "Satuan dari gaya dalam sistem internasional adalah?",
    "options": ["Kg", "Meter", "Newton", "Joule"],
    "correct": 2,
    "explanation": "Gaya diukur dalam satuan Newton (N)."
  },
  {
    "id": 7,
    "question": "Zat yang memiliki bentuk dan volume tetap disebut?",
    "options": ["Padat", "Cair", "Gas", "Plasma"],
    "correct": 0,
    "explanation": "Zat padat memiliki bentuk dan volume yang tetap."
  },
  {
    "id": 8,
    "question": "Perubahan air menjadi uap disebut?",
    "options": ["Mengembun", "Mencair", "Menguap", "Membeku"],
    "correct": 2,
    "explanation": "Menguap adalah proses perubahan dari cair ke gas."
  },
  {
    "id": 9,
    "question": "Contoh tumbuhan yang berkembang biak dengan spora adalah?",
    "options": ["Mangga", "Paku", "Jagung", "Ketela"],
    "correct": 1,
    "explanation": "Tumbuhan paku berkembang biak dengan spora."
  },
  {
    "id": 10,
    "question": "Fungsi utama daun pada tumbuhan adalah?",
    "options": ["Bernapas", "Menopang bunga", "Fotosintesis", "Menyerap air"],
    "correct": 2,
    "explanation": "Daun berfungsi untuk fotosintesis, membuat makanan bagi tumbuhan."
  },
  {
    "id": 11,
    "question": "Hewan yang mengalami metamorfosis sempurna adalah?",
    "options": ["Katak", "Kupu-kupu", "Kucing", "Cicak"],
    "correct": 1,
    "explanation": "Kupu-kupu mengalami metamorfosis sempurna: telur, larva, pupa, dewasa."
  },
  {
    "id": 12,
    "question": "Lapisan ozon berada di bagian atmosfer yang disebut?",
    "options": ["Troposfer", "Stratosfer", "Mesosfer", "Termosfer"],
    "correct": 1,
    "explanation": "Lapisan ozon berada di stratosfer, melindungi dari sinar UV."
  },
  {
    "id": 13,
    "question": "Bagian mata yang mengatur banyaknya cahaya yang masuk adalah?",
    "options": ["Retina", "Lensa", "Pupil", "Kornea"],
    "correct": 2,
    "explanation": "Pupil mengatur besar kecilnya cahaya yang masuk ke mata."
  },
  {
    "id": 14,
    "question": "Gigi manusia yang berfungsi untuk mengunyah makanan adalah?",
    "options": ["Taring", "Gigi seri", "Geraham", "Gigi susu"],
    "correct": 2,
    "explanation": "Gigi geraham digunakan untuk mengunyah makanan."
  },
  {
    "id": 15,
    "question": "Alat pernapasan utama pada manusia adalah?",
    "options": ["Mulut", "Paru-paru", "Trakea", "Kerongkongan"],
    "correct": 1,
    "explanation": "Paru-paru adalah organ utama sistem pernapasan manusia."
  },
  {
    "id": 16,
    "question": "Zat tunggal yang tidak bisa diuraikan lagi disebut?",
    "options": ["Campuran", "Unsur", "Senyawa", "Larutan"],
    "correct": 1,
    "explanation": "Unsur adalah zat tunggal paling sederhana, seperti oksigen."
  },
  {
    "id": 17,
    "question": "Sumber energi utama bagi makhluk hidup di Bumi adalah?",
    "options": ["Air", "Angin", "Matahari", "Tanah"],
    "correct": 2,
    "explanation": "Matahari adalah sumber energi utama untuk semua makhluk hidup."
  },
  {
    "id": 18,
    "question": "Tumbuhan memerlukan gas ... untuk fotosintesis.",
    "options": ["Oksigen", "Karbon dioksida", "Nitrogen", "Hidrogen"],
    "correct": 1,
    "explanation": "Karbon dioksida digunakan tumbuhan saat fotosintesis."
  },
  {
    "id": 19,
    "question": "Makhluk hidup yang membuat makanan sendiri disebut?",
    "options": ["Konsumen", "Herbivora", "Autotrof", "Karnivora"],
    "correct": 2,
    "explanation": "Autotrof adalah makhluk hidup yang bisa membuat makanan sendiri, seperti tumbuhan."
  },
  {
    "id": 20,
    "question": "Contoh perubahan kimia adalah?",
    "options": ["Es mencair", "Air menguap", "Besi berkarat", "Plastik meleleh"],
    "correct": 2,
    "explanation": "Besi berkarat adalah reaksi kimia antara besi, air, dan oksigen."
  },
  {
    "id": 21,
    "question": "Alat ukur suhu disebut?",
    "options": ["Barometer", "Higrometer", "Termometer", "Altimeter"],
    "correct": 2,
    "explanation": "Termometer digunakan untuk mengukur suhu."
  },
  {
    "id": 22,
    "question": "Hewan yang memiliki tulang belakang disebut?",
    "options": ["Vertebrata", "Invertebrata", "Amfibi", "Mollusca"],
    "correct": 0,
    "explanation": "Vertebrata adalah kelompok hewan yang memiliki tulang belakang."
  },
  {
    "id": 23,
    "question": "Proses penguapan air dari permukaan daun disebut?",
    "options": ["Respirasi", "Fotosintesis", "Transpirasi", "Evaporasi"],
    "correct": 2,
    "explanation": "Transpirasi adalah penguapan air melalui stomata daun."
  },
  {
    "id": 24,
    "question": "Planet terdekat dengan Matahari adalah?",
    "options": ["Venus", "Bumi", "Merkurius", "Mars"],
    "correct": 2,
    "explanation": "Merkurius adalah planet yang paling dekat dengan Matahari."
  },
  {
    "id": 25,
    "question": "Gaya yang bekerja saat kita menendang bola disebut?",
    "options": ["Gaya magnet", "Gaya otot", "Gaya gravitasi", "Gaya gesek"],
    "correct": 1,
    "explanation": "Gaya otot berasal dari tenaga tubuh yang menggerakkan benda."
  }
]

export default function ChristianQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
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
