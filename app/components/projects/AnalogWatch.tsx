"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AnalogWatch() {
  const [angles, setAngles] = useState({ hr: 0, min: 0, sec: 0 });

  useEffect(() => {
    const updateWatch = () => {
      const now = new Date();
      const hr = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      const calcHr = (hr * 30) + (min / 2);
      const calcMin = (min * 6) + (sec / 10);
      const calcSec = sec * 6;

      setAngles({ hr: calcHr, min: calcMin, sec: calcSec });
    };

    updateWatch();
    const interval = setInterval(updateWatch, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-[450px] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <h3 className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-8 z-10">
        Swiss Analog Clock
      </h3>

      <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-[12px] border-slate-800 bg-[#16191e] shadow-2xl shadow-black/80 flex items-center justify-center z-10 overflow-hidden">
        {/* Watch Face template SVG */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-90 select-none">
          <Image
            src="/projects/analog-watch/analogWatchTemplate.svg"
            alt="Clock Face"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hands */}
        {/* Hour Hand */}
        <div
          className="absolute left-1/2 bottom-1/2 -translate-x-1/2 rounded-full origin-bottom z-10 bg-slate-100 shadow"
          style={{
            width: "8px",
            height: "65px",
            transform: `translateX(-50%) rotate(${angles.hr}deg)`,
            transition: angles.hr === 0 ? "none" : "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 1)",
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute left-1/2 bottom-1/2 -translate-x-1/2 rounded-full origin-bottom z-20 bg-indigo-300 shadow"
          style={{
            width: "5px",
            height: "85px",
            transform: `translateX(-50%) rotate(${angles.min}deg)`,
            transition: angles.min === 0 ? "none" : "transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 1)",
          }}
        />

        {/* Seconds Hand */}
        <div
          className="absolute left-1/2 bottom-1/2 -translate-x-1/2 rounded-full origin-bottom z-30 bg-pink-500 shadow-md shadow-pink-500/20"
          style={{
            width: "3px",
            height: "95px",
            transform: `translateX(-50%) rotate(${angles.sec}deg)`,
            transition: angles.sec === 0 ? "none" : "transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 1)",
          }}
        />

        {/* Pin center cap */}
        <div className="absolute w-4 h-4 rounded-full bg-slate-900 border-2 border-pink-500 shadow-md z-45" />
      </div>

      <div className="mt-8 text-slate-400 font-mono text-sm tracking-wider z-10 uppercase bg-slate-950 px-4 py-2 border border-slate-800 rounded-full">
        {new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );
}
