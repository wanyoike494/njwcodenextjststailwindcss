"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [prevVal, setPrevVal] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "AC") {
      setDisplay("");
      setPrevVal("");
    } else if (value === "DEL") {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      calculateResult();
    } else {
      // Prevent consecutive operators
      const operators = ["+", "-", "*", "/", "%"];
      if (operators.includes(value) && operators.includes(display.slice(-1))) {
        return;
      }
      setDisplay((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    if (!display) return;
    try {
      // Replace % with /100 and evaluate
      let expression = display;
      
      // Let's implement a safe math evaluation
      // Replace X with *
      expression = expression.replace(/x/g, "*");
      
      // Handle percent: replace 'num%' with 'num/100'
      expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

      // Safe evaluation check: only digits, decimal, parenthesis, and math operators
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error("Invalid Input");
      }

      // eslint-disable-next-line no-eval
      const evalResult = eval(expression);
      
      if (isNaN(evalResult) || !isFinite(evalResult)) {
        setDisplay("Error");
      } else {
        setPrevVal(display + " =");
        // format output nicely (avoid long decimals if possible)
        const roundedResult = Number(evalResult.toFixed(8)).toString();
        setDisplay(roundedResult);
      }
    } catch {
      setDisplay("Error");
    }
  };

  const buttons = [
    { label: "AC", class: "bg-slate-200 text-slate-750 hover:bg-slate-300 font-semibold" },
    { label: "DEL", class: "bg-slate-200 text-slate-750 hover:bg-slate-300 font-semibold" },
    { label: "%", class: "bg-slate-200 text-slate-750 hover:bg-slate-300 font-semibold" },
    { label: "/", class: "bg-indigo-500 text-white hover:bg-indigo-600 font-bold" },

    { label: "7", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "8", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "9", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "*", class: "bg-indigo-500 text-white hover:bg-indigo-600 font-bold" },

    { label: "4", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "5", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "6", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "-", class: "bg-indigo-500 text-white hover:bg-indigo-600 font-bold" },

    { label: "1", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "2", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "3", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "+", class: "bg-indigo-500 text-white hover:bg-indigo-600 font-bold" },

    { label: "0", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "00", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: ".", class: "bg-white text-slate-800 hover:bg-slate-100 font-medium" },
    { label: "=", class: "bg-pink-500 text-white hover:bg-pink-600 font-bold" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
      <h3 className="text-center text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-6">
        NJW Calculator
      </h3>

      {/* Screen display */}
      <div className="flex flex-col items-end justify-end px-4 py-6 mb-6 h-28 bg-slate-950 rounded-2xl border border-slate-800 text-right overflow-hidden">
        {prevVal && (
          <span className="text-slate-500 text-xs sm:text-sm font-mono tracking-wider truncate max-w-full">
            {prevVal}
          </span>
        )}
        <span className="text-white text-3xl sm:text-4xl font-mono truncate max-w-full mt-1">
          {display || "0"}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleButtonClick(btn.label)}
            className={`h-14 rounded-xl text-lg transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center cursor-pointer ${btn.class}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
