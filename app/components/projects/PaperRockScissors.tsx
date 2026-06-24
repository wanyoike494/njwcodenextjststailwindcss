"use client";

import { useState } from "react";

type Move = "rock" | "paper" | "scissors";

const MOVE_EMOJIS: Record<Move, string> = {
  rock: "✊",
  paper: "📄",
  scissors: "✂️",
};

export default function PaperRockScissors() {
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [computerMove, setComputerMove] = useState<Move | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "tie" | null>(null);

  const playGame = (move: Move) => {
    const moves: Move[] = ["rock", "paper", "scissors"];
    const compMove = moves[Math.floor(Math.random() * moves.length)];
    setPlayerMove(move);
    setComputerMove(compMove);

    if (move === compMove) {
      setResult("tie");
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    } else if (
      (move === "rock" && compMove === "scissors") ||
      (move === "paper" && compMove === "rock") ||
      (move === "scissors" && compMove === "paper")
    ) {
      setResult("win");
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setResult("lose");
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, ties: 0 });
    setPlayerMove(null);
    setComputerMove(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-[450px] rounded-3xl bg-white border border-gray-100 shadow-xl max-w-lg mx-auto">
      <h3 className="text-sm font-semibold tracking-widest text-indigo-500 uppercase mb-6">
        Rock Paper Scissors Game
      </h3>

      <div className="flex justify-around w-full mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">{score.wins}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wins</p>
        </div>
        <div className="border-r border-slate-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-amber-600">{score.ties}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ties</p>
        </div>
        <div className="border-r border-slate-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-rose-600">{score.losses}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Losses</p>
        </div>
      </div>

      <div className="w-full flex gap-4 justify-center mb-8">
        {(["rock", "paper", "scissors"] as Move[]).map((move) => (
          <button
            key={move}
            onClick={() => playGame(move)}
            className="flex-1 max-w-[100px] flex flex-col items-center gap-2 p-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all duration-200 active:scale-95 group"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
              {MOVE_EMOJIS[move]}
            </span>
            <span className="text-xs font-bold text-slate-650 capitalize">{move}</span>
          </button>
        ))}
      </div>

      {playerMove && computerMove && result && (
        <div className="w-full text-center bg-slate-50 p-5 rounded-2xl border border-slate-100 animate-fade-in-up">
          <div className="flex justify-center items-center gap-6 mb-3">
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold text-slate-500">You</span>
              <span className="text-4xl">{MOVE_EMOJIS[playerMove]}</span>
            </div>
            <span className="text-xl font-bold text-slate-350">VS</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold text-slate-500">CPU</span>
              <span className="text-4xl">{MOVE_EMOJIS[computerMove]}</span>
            </div>
          </div>

          <div
            className={`text-xl font-extrabold tracking-wide uppercase ${
              result === "win"
                ? "text-emerald-500"
                : result === "lose"
                  ? "text-rose-500"
                  : "text-amber-500"
            }`}
          >
            {result === "win" ? "🎉 You Win!" : result === "lose" ? "😢 You Lose!" : "🤝 It's a Tie!"}
          </div>
        </div>
      )}

      <button
        onClick={resetScore}
        className="mt-6 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider"
      >
        Reset Game
      </button>
    </div>
  );
}
