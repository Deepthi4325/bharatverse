import React, { useState } from "react";
import {
  Award,
  Sparkles,
  X,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Trophy,
  Loader2,
  ChevronRight,
  Flame
} from "lucide-react";
import confetti from "canvas-confetti";
import { QuizQuestion } from "../types";
import { playTempleBellChime } from "../utils/audioSynth";

interface HeritageQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestions: QuizQuestion[];
}

export const HeritageQuizModal: React.FC<HeritageQuizModalProps> = ({
  isOpen,
  onClose,
  initialQuestions,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [generatingAiQuiz, setGeneratingAiQuiz] = useState<boolean>(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 10 + streak * 2);
      setStreak((prev) => prev + 1);
      playTempleBellChime();

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#7A1C22", "#E06D14", "#D4AF37", "#2C1810"],
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizCompleted(false);
  };

  const handleGenerateAiQuiz = async (topic: string = "All Heritage") => {
    setGeneratingAiQuiz(true);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic,
          difficulty: "Scholar",
          count: 5,
        }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        handleRestart();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingAiQuiz(false);
    }
  };

  if (!isOpen) return null;

  const getRank = (scoreVal: number) => {
    if (scoreVal >= 70) return { title: "Vaidika Acharya (Supreme Heritage Scholar)", color: "text-[#E06D14]" };
    if (scoreVal >= 40) return { title: "Dharohar Yatri (Heritage Explorer)", color: "text-[#7A1C22]" };
    return { title: "Jigyasu (Curious Heritage Seeker)", color: "text-[#8B6E58]" };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#7A1C22] to-[#A03038] text-white flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center border-2 border-[#D4AF37]">
              <Trophy className="w-5 h-5 text-[#E06D14]" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                Dharohar Trivia Arena
              </h3>
              <p className="text-xs text-[#F2E4D2]">
                Test your knowledge of Indian civilization & crafts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!quizCompleted && currentQ ? (
            <div className="space-y-5">
              {/* Score and Progress Bar */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#5C4535]">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <div className="flex items-center gap-3">
                  {streak > 1 && (
                    <span className="flex items-center gap-1 text-[#E06D14] font-bold">
                      <Flame className="w-3.5 h-3.5 fill-[#E06D14]" />
                      <span>{streak}x Streak!</span>
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-full bg-[#FAF0DC] text-[#7A1C22] border border-[#D4AF37]/30">
                    Score: {score} pts
                  </span>
                </div>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-1.5 bg-[#E8DCC4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7A1C22] transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Category and Difficulty Tag */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#7A1C22]/10 text-[#7A1C22] text-[11px] font-bold uppercase">
                  {currentQ.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#E06D14]/15 text-[#A04508] text-[10px] font-semibold">
                  {currentQ.difficulty}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#2C1810] leading-snug">
                {currentQ.question}
              </h4>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = "bg-white border-[#E8DCC4] text-[#2C1810] hover:border-[#D4AF37]";

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "bg-green-100 border-green-600 text-green-900 font-semibold";
                    } else if (idx === selectedOption) {
                      btnStyle = "bg-red-100 border-red-600 text-red-900";
                    } else {
                      btnStyle = "bg-white opacity-50 border-[#E8DCC4]";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-700 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-[#FAF0DC] border border-[#D4AF37]/50 space-y-2 text-xs text-[#3E2B20] animate-in fade-in">
                  <div className="font-bold text-[#7A1C22] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
                    <span>Heritage Explanation:</span>
                  </div>
                  <p>{currentQ.explanation}</p>
                  {currentQ.heritageFact && (
                    <div className="pt-1 text-[11px] text-[#8B5E3C] italic">
                      <span className="font-bold">Did you know? </span>
                      {currentQ.heritageFact}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF0DC] border-2 border-[#D4AF37] mx-auto flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#E06D14]" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#2C1810]">
                Knowledge Voyage Complete!
              </h3>
              <p className="text-3xl font-bold text-[#7A1C22] font-cinzel">
                {score} Points
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#E8DCC4] max-w-sm mx-auto">
                <span className="text-xs text-[#8B6E58]">Earned Heritage Title:</span>
                <p className={`font-cinzel font-bold text-sm ${getRank(score).color}`}>
                  {getRank(score).title}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2.5 rounded-xl bg-[#7A1C22] text-white text-xs font-semibold hover:bg-[#92222A] flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
                <button
                  onClick={() => handleGenerateAiQuiz("Monuments & Ancient Astronomy")}
                  disabled={generatingAiQuiz}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF0DC] text-[#7A1C22] border border-[#D4AF37]/40 text-xs font-semibold hover:bg-[#F2E4C4] flex items-center gap-2"
                >
                  {generatingAiQuiz ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
                  )}
                  <span>Generate New AI Questions</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {!quizCompleted && (
          <div className="p-4 bg-white border-t border-[#E8DCC4] flex items-center justify-between">
            <button
              onClick={() => handleGenerateAiQuiz()}
              disabled={generatingAiQuiz}
              className="text-xs text-[#7A1C22] font-semibold flex items-center gap-1.5 hover:underline"
            >
              {generatingAiQuiz ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#E06D14]" />
              )}
              <span>New AI Challenge</span>
            </button>

            {isAnswered && (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-[#7A1C22] text-white text-xs font-bold hover:bg-[#92222A] flex items-center gap-1.5 shadow-xs"
              >
                <span>{currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
