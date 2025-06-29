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
    "question": "Berapa jumlah kitab dalam Perjanjian Lama?",
    "options": ["27", "39", "66", "73"],
    "correct": 1,
    "explanation": "Perjanjian Lama terdiri dari 39 kitab, sedangkan Perjanjian Baru terdiri dari 27 kitab."
  },
  {
    "id": 2,
    "question": "Siapa yang membelah Laut Merah dengan tongkat?",
    "options": ["Abraham", "Daud", "Musa", "Elia"],
    "correct": 2,
    "explanation": "Musa membelah Laut Merah dengan tongkat atas perintah Tuhan saat membawa bangsa Israel keluar dari Mesir."
  },
  {
    "id": 3,
    "question": "Kitab pertama dalam Alkitab adalah?",
    "options": ["Keluaran", "Kejadian", "Imamat", "Mazmur"],
    "correct": 1,
    "explanation": "Kitab pertama dalam Alkitab adalah Kejadian yang menceritakan penciptaan dunia."
  },
  {
    "id": 4,
    "question": "Siapa murid Yesus yang menyangkal-Nya tiga kali?",
    "options": ["Yudas", "Tomas", "Petrus", "Yohanes"],
    "correct": 2,
    "explanation": "Petrus menyangkal Yesus sebanyak tiga kali sebelum ayam berkokok."
  },
  {
    "id": 5,
    "question": "Berapa banyak murid Yesus?",
    "options": ["10", "11", "12", "13"],
    "correct": 2,
    "explanation": "Yesus memiliki 12 murid yang disebut juga rasul."
  },
  {
    "id": 6,
    "question": "Siapakah penulis sebagian besar surat dalam Perjanjian Baru?",
    "options": ["Petrus", "Yohanes", "Paulus", "Yakobus"],
    "correct": 2,
    "explanation": "Rasul Paulus menulis banyak surat kepada jemaat yang kini menjadi bagian dari Perjanjian Baru."
  },
  {
    "id": 7,
    "question": "Apa nama taman tempat Adam dan Hawa tinggal?",
    "options": ["Taman Damai", "Taman Getsemani", "Taman Firdaus", "Taman Eden"],
    "correct": 3,
    "explanation": "Adam dan Hawa tinggal di Taman Eden, tempat yang diciptakan Allah bagi mereka."
  },
  {
    "id": 8,
    "question": "Siapa yang disebut sebagai 'manusia paling sabar' dalam Alkitab?",
    "options": ["Ayub", "Daud", "Salomo", "Musa"],
    "correct": 0,
    "explanation": "Ayub dikenal karena kesabarannya dalam menghadapi penderitaan yang berat."
  },
  {
    "id": 9,
    "question": "Siapa ibu dari Yesus?",
    "options": ["Marta", "Elisabet", "Maria", "Hana"],
    "correct": 2,
    "explanation": "Maria adalah ibu dari Yesus, yang mengandung melalui Roh Kudus."
  },
  {
    "id": 10,
    "question": "Apa mukjizat pertama yang dilakukan Yesus?",
    "options": ["Menyembuhkan orang sakit", "Berjalan di atas air", "Mengusir setan", "Mengubah air menjadi anggur"],
    "correct": 3,
    "explanation": "Mukjizat pertama Yesus adalah mengubah air menjadi anggur di pernikahan di Kana."
  },
  {
    "id": 11,
    "question": "Kitab Mazmur sebagian besar ditulis oleh siapa?",
    "options": ["Salomo", "Yesaya", "Daud", "Samuel"],
    "correct": 2,
    "explanation": "Sebagian besar Mazmur ditulis oleh Raja Daud sebagai pujian kepada Tuhan."
  },
  {
    "id": 12,
    "question": "Di gunung apa Musa menerima Sepuluh Perintah Allah?",
    "options": ["Gunung Sinai", "Gunung Karmel", "Gunung Sion", "Gunung Ararat"],
    "correct": 0,
    "explanation": "Musa menerima Sepuluh Perintah Allah di Gunung Sinai."
  },
  {
    "id": 13,
    "question": "Apa bahasa asli sebagian besar Perjanjian Lama?",
    "options": ["Yunani", "Latin", "Ibrani", "Aram"],
    "correct": 2,
    "explanation": "Sebagian besar Perjanjian Lama ditulis dalam bahasa Ibrani."
  },
  {
    "id": 14,
    "question": "Siapakah raja Israel yang terkenal karena hikmatnya?",
    "options": ["Saul", "Daud", "Salomo", "Yerobeam"],
    "correct": 2,
    "explanation": "Salomo dikenal karena hikmatnya yang luar biasa yang diberikan oleh Tuhan."
  },
  {
    "id": 15,
    "question": "Apa isi hukum terbesar menurut Yesus?",
    "options": ["Jangan mencuri", "Kasihilah sesamamu", "Kasihilah Tuhan Allahmu", "Hormatilah orang tuamu"],
    "correct": 2,
    "explanation": "Yesus mengatakan hukum terbesar adalah mengasihi Tuhan Allah dengan segenap hati."
  },
  {
    "id": 16,
    "question": "Berapa hari Yesus berada di kubur sebelum bangkit?",
    "options": ["1", "2", "3", "4"],
    "correct": 2,
    "explanation": "Yesus bangkit pada hari ketiga setelah kematian-Nya."
  },
  {
    "id": 17,
    "question": "Apa nama rasul yang menggantikan Yudas Iskariot?",
    "options": ["Barnabas", "Paulus", "Matias", "Stefanus"],
    "correct": 2,
    "explanation": "Matias dipilih untuk menggantikan Yudas Iskariot setelah pengkhianatannya."
  },
  {
    "id": 18,
    "question": "Dalam kitab mana terdapat kisah penciptaan dunia?",
    "options": ["Mazmur", "Kejadian", "Imamat", "Daniel"],
    "correct": 1,
    "explanation": "Kisah penciptaan dunia dicatat dalam Kejadian pasal 1 dan 2."
  },
  {
    "id": 19,
    "question": "Siapa yang membunuh Habel?",
    "options": ["Set", "Abel", "Kain", "Lamekh"],
    "correct": 2,
    "explanation": "Kain membunuh saudaranya Habel karena iri hati."
  },
  {
    "id": 20,
    "question": "Apa nama kitab terakhir dalam Alkitab?",
    "options": ["Yudas", "Wahyu", "Roma", "Kisah Para Rasul"],
    "correct": 1,
    "explanation": "Kitab Wahyu adalah kitab terakhir dalam Alkitab, berisi penglihatan Yohanes tentang akhir zaman."
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
