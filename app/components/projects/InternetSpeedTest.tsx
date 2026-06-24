"use client";

import { useState } from "react";
import { Gauge, Play, Wifi } from "lucide-react";

export default function InternetSpeedTest() {
  const [speed, setSpeed] = useState<string>("0.00");
  const [status, setStatus] = useState("Click start to test internet speed");
  const [testing, setTesting] = useState(false);

  const runSpeedTest = async () => {
    if (testing) return;
    setTesting(true);
    setStatus("Connecting to speed test server...");
    setSpeed("0.00");

    // 1. Prepare image download
    const imageAddr = `https://picsum.photos/2000/3000?random=${Math.random()}`;
    const downloadSizeBits = 5000000 * 8; // Assumed 5 megabytes in bits

    try {
      const startTime = new Date().getTime();

      // Trigger download
      const response = await fetch(imageAddr, { cache: "no-store" });
      if (!response.ok) throw new Error("Connection failed");

      // Read stream to measure the duration
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Stream reader not supported");

      while (true) {
        const { done } = await reader.read();
        if (done) break;
      }

      const endTime = new Date().getTime();
      const timeDurationSeconds = (endTime - startTime) / 1000;

      // Compute speed
      const speedBps = downloadSizeBits / timeDurationSeconds;
      const speedMbps = parseFloat((speedBps / (1024 * 1024)).toFixed(2));

      // 2. Animate counter up to the computed speed
      animateSpeed(speedMbps);
    } catch (error) {
      console.error(error);
      setStatus("Error: Speed test failed. Try again.");
      setTesting(false);
    }
  };

  const animateSpeed = (finalSpeed: number) => {
    setStatus("Speed test completed");
    let currentSpeed = 0;
    const increment = finalSpeed / 25; // 25 steps

    const interval = setInterval(() => {
      currentSpeed += increment;
      if (currentSpeed >= finalSpeed) {
        clearInterval(interval);
        setSpeed(finalSpeed.toFixed(2));
        setTesting(false);
      } else {
        setSpeed(currentSpeed.toFixed(2));
      }
    }, 30);
  };

  const numSpeed = parseFloat(speed);
  // Cap at 100Mbps for standard gauge visual percentage
  const gaugePercent = Math.min(100, (numSpeed / 100) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-[420px] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg mx-auto relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <h3 className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-8 z-10 flex items-center gap-1.5">
        <Wifi size={16} /> Internet Speed Test
      </h3>

      {/* Speed Dial Gauge */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-8 z-10">
        {/* Outer Circular border */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r="80"
            stroke="#1e293b"
            strokeWidth="8"
            fill="transparent"
            className="translate-x-[0px] translate-y-[0px]"
          />
          <circle
            cx="88"
            cy="88"
            r="80"
            stroke={testing ? "#ec4899" : "#6366f1"}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - gaugePercent / 100)}
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Speed text inner info */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white tracking-tighter">
            {speed}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            Mbps
          </span>
        </div>
      </div>

      <div className="w-full text-center mb-6 z-10">
        <p className="text-slate-400 text-sm font-medium h-6">
          {status}
        </p>
      </div>

      <button
        onClick={runSpeedTest}
        disabled={testing}
        className="px-6 py-3.5 bg-indigo-500 hover:bg-indigo-650 active:bg-indigo-750 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-150 active:scale-95 shadow-lg flex items-center gap-2 cursor-pointer z-10"
      >
        {testing ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Testing Speed...
          </>
        ) : (
          <>
            <Play size={16} fill="white" />
            Start Test
          </>
        )}
      </button>
    </div>
  );
}
