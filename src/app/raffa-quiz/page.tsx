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
    "question": "Hasil dari (2x + 3)(x - 5) adalah?",
    "options": ["2x² - 10x + 3x - 15", "2x² - 7x - 15", "2x² + 7x - 15", "2x² - 7x + 15"],
    "correct": 1,
    "explanation": "Gunakan distributif: (2x + 3)(x - 5) = 2x² - 10x + 3x - 15 = 2x² - 7x -15."
  },
  {
    "id": 2,
    "question": "Jika sin x = 1/2 dan 0° < x < 180°, maka nilai x adalah?",
    "options": ["30° atau 150°", "45° atau 135°", "60° atau 120°", "90°"],
    "correct": 0,
    "explanation": "sin x = 1/2 untuk x = 30° dan 150°."
  },
  {
    "id": 3,
    "question": "Jika f(x) = 2x² - 3x + 1, maka f(2) = ?",
    "options": ["3", "5", "7", "9"],
    "correct": 2,
    "explanation": "f(2) = 2(2)² - 3(2) + 1 = 8 - 6 + 1 = 3."
  },
  {
    "id": 4,
    "question": "Akar-akar dari x² - 5x + 6 = 0 adalah?",
    "options": ["x = 2 dan 3", "x = 1 dan 6", "x = -2 dan -3", "x = 1 dan 5"],
    "correct": 0,
    "explanation": "Faktorisasi: (x - 2)(x - 3) = 0 → x = 2 atau 3."
  },
  {
    "id": 5,
    "question": "Berapakah nilai log₁₀ 1000?",
    "options": ["1", "2", "3", "4"],
    "correct": 2,
    "explanation": "log₁₀ 1000 = log₁₀ 10³ = 3."
  },
  {
    "id": 6,
    "question": "Rumus luas lingkaran adalah?",
    "options": ["πd", "πr", "πr²", "2πr"],
    "correct": 2,
    "explanation": "Luas lingkaran = π × r²."
  },
  {
    "id": 7,
    "question": "Jika rata-rata dari 4, 6, 8, x adalah 7, maka x adalah?",
    "options": ["10", "9", "8", "7"],
    "correct": 0,
    "explanation": "(4+6+8+x)/4 = 7 → 18 + x = 28 → x = 10."
  },
  {
    "id": 8,
    "question": "Himpunan penyelesaian dari |x - 3| = 5 adalah?",
    "options": ["x = 2 atau -2", "x = 8 atau -2", "x = 8 atau -8", "x = 8 atau -5"],
    "correct": 1,
    "explanation": "x - 3 = 5 → x = 8 atau x - 3 = -5 → x = -2."
  },
  {
    "id": 9,
    "question": "Hasil dari 3² + 4² adalah?",
    "options": ["5", "9", "25", "7"],
    "correct": 2,
    "explanation": "3² + 4² = 9 + 16 = 25."
  },
  {
    "id": 10,
    "question": "Jika a = 2 dan b = 3, maka nilai dari (a + b)² adalah?",
    "options": ["25", "36", "49", "16"],
    "correct": 0,
    "explanation": "(2 + 3)² = 5² = 25."
  },
  {
    "id": 11,
    "question": "Jumlah sudut segitiga adalah?",
    "options": ["90°", "180°", "270°", "360°"],
    "correct": 1,
    "explanation": "Jumlah sudut segitiga selalu 180°."
  },
  {
    "id": 12,
    "question": "Jika p(3, 4), maka jarak titik p ke titik asal (0, 0) adalah?",
    "options": ["3", "4", "5", "6"],
    "correct": 2,
    "explanation": "√(3² + 4²) = √(9+16) = √25 = 5."
  },
  {
    "id": 13,
    "question": "Peluang muncul angka genap saat melempar dadu adalah?",
    "options": ["1/3", "1/2", "2/3", "1/6"],
    "correct": 1,
    "explanation": "Angka genap: 2,4,6 → 3 dari 6 kemungkinan → 3/6 = 1/2."
  },
  {
    "id": 14,
    "question": "Volume balok dengan panjang 4 cm, lebar 3 cm, dan tinggi 5 cm adalah?",
    "options": ["60 cm³", "70 cm³", "50 cm³", "40 cm³"],
    "correct": 0,
    "explanation": "Volume = p × l × t = 4×3×5 = 60 cm³."
  },
  {
    "id": 15,
    "question": "Fungsi kuadrat y = x² - 4x + 4 memiliki titik puncak di?",
    "options": ["(2,0)", "(4,2)", "(2,4)", "(0,4)"],
    "correct": 2,
    "explanation": "Titik puncak: x = -b/2a = 4/2 = 2 → y = 2² - 4×2 + 4 = 4 - 8 + 4 = 0 → (2,0)."
  }
]

export default function ChristianQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60000); // 10 minutes
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
