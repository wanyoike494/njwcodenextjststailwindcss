"use client";

import { useEffect, useState } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState({
    hour: "00",
    minute: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hour: now.getHours().toString().padStart(2, "0"),
        minute: now.getMinutes().toString().padStart(2, "0"),
        seconds: now.getSeconds().toString().padStart(2, "0"),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16 min-h-[400px] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <h3 className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-8 z-10">
        Live Digital Clock
      </h3>

      <div className="flex items-center gap-3 sm:gap-6 font-mono text-5xl sm:text-7xl md:text-8xl text-white select-none z-10">
        <div className="flex items-center justify-center w-20 sm:w-32 md:w-40 h-28 sm:h-40 bg-slate-800 border border-slate-700 rounded-2xl shadow-lg shadow-black/40 backdrop-blur-md">
          {time.hour}
        </div>
        <span className="text-indigo-500 animate-pulse">:</span>
        <div className="flex items-center justify-center w-20 sm:w-32 md:w-40 h-28 sm:h-40 bg-slate-800 border border-slate-700 rounded-2xl shadow-lg shadow-black/40 backdrop-blur-md">
          {time.minute}
        </div>
        <span className="text-indigo-500 animate-pulse">:</span>
        <div className="flex items-center justify-center w-20 sm:w-32 md:w-40 h-28 sm:h-40 bg-slate-800 border border-slate-700 rounded-2xl shadow-lg shadow-black/40 backdrop-blur-md text-pink-400">
          {time.seconds}
        </div>
      </div>

      <div className="mt-8 text-slate-400 text-sm sm:text-base font-medium z-10">
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
