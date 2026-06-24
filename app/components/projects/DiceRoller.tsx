"use client";

import { useState } from "react";

interface DieProps {
  value: number;
  rolling: boolean;
}

function Die({ value, rolling }: DieProps) {
  // Dot coordinate map for a 100x100 SVG viewbox
  // Columns: left=30, center=50, right=70
  // Rows: top=30, center=50, bottom=70
  const getDotCoordinates = (val: number) => {
    switch (val) {
      case 1:
        return [{ cx: 50, cy: 50 }];
      case 2:
        return [
          { cx: 30, cy: 30 },
          { cx: 70, cy: 70 },
        ];
      case 3:
        return [
          { cx: 30, cy: 30 },
          { cx: 50, cy: 50 },
          { cx: 70, cy: 70 },
        ];
      case 4:
        return [
          { cx: 30, cy: 30 },
          { cx: 70, cy: 30 },
          { cx: 30, cy: 70 },
          { cx: 70, cy: 70 },
        ];
      case 5:
        return [
          { cx: 30, cy: 30 },
          { cx: 70, cy: 30 },
          { cx: 50, cy: 50 },
          { cx: 30, cy: 70 },
          { cx: 70, cy: 70 },
        ];
      case 6:
        return [
          { cx: 30, cy: 30 },
          { cx: 70, cy: 30 },
          { cx: 30, cy: 50 },
          { cx: 70, cy: 50 },
          { cx: 30, cy: 70 },
          { cx: 70, cy: 70 },
        ];
      default:
        return [];
    }
  };

  const dots = getDotCoordinates(value);

  return (
    <svg
      className={`w-20 h-20 sm:w-24 sm:h-24 shadow-md rounded-2xl border border-slate-200/80 bg-white transition-transform ${
        rolling ? "animate-bounce rotate-12" : ""
      }`}
      viewBox="0 0 100 100"
      aria-label={`Die face showing ${value}`}
    >
      {/* Background shadow inset effect */}
      <rect x="5" y="5" width="90" height="90" rx="15" fill="none" />
      {/* Dots */}
      {dots.map((dot, idx) => (
        <circle
          key={idx}
          cx={dot.cx}
          cy={dot.cy}
          r="8"
          className={value === 1 ? "fill-rose-500" : "fill-slate-800"}
        />
      ))}
    </svg>
  );
}

export default function DiceRoller() {
  const [numDice, setNumDice] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<number[]>([1]);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);

    // Simulate dice shake delay with Promises
    const shakeDice = new Promise<number[]>((resolve) => {
      setTimeout(() => {
        const results = Array.from(
          { length: numDice },
          () => Math.floor(Math.random() * 6) + 1
        );
        resolve(results);
      }, 600); // 600ms roll delay
    });

    shakeDice.then((values) => {
      setDiceValues(values);
      setRolling(false);
    });
  };

  const sum = diceValues.reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-[400px] rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-teal-150 shadow-xl max-w-lg mx-auto">
      <h3 className="text-sm font-semibold tracking-widest text-emerald-600 uppercase mb-8">
        Promise Dice Roller
      </h3>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Number of Dice
          </label>
          <input
            type="number"
            value={numDice}
            onChange={(e) => {
              const val = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
              setNumDice(val);
            }}
            min="1"
            max="10"
            disabled={rolling}
            className="w-24 px-4 py-2 border-2 border-slate-200 focus:border-emerald-400 focus:outline-none rounded-xl text-center font-bold text-slate-850 bg-white"
          />
        </div>

        <button
          onClick={rollDice}
          disabled={rolling}
          className="px-6 py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-150 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 mt-5"
        >
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>

      <div className="min-h-[140px] flex flex-wrap justify-center items-center gap-4 p-6 w-full rounded-2xl bg-white border border-slate-100 shadow-inner mb-6">
        {diceValues.map((val, idx) => (
          <Die key={idx} value={val} rolling={rolling} />
        ))}
      </div>

      <div className="text-center font-semibold text-slate-700">
        {rolling ? (
          <span className="text-slate-400 animate-pulse">Shaking dice...</span>
        ) : (
          <p className="animate-fade-in-up">
            Results: <span className="text-slate-850 font-bold">{diceValues.join(", ")}</span> (Sum:{" "}
            <span className="text-emerald-600 font-extrabold">{sum}</span>)
          </p>
        )}
      </div>
    </div>
  );
}
