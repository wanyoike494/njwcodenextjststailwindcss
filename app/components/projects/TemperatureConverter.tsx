"use client";

import { useState } from "react";

type Unit = "toFah" | "toCel";

export default function TemperatureConverter() {
  const [val, setVal] = useState<string>("0");
  const [unit, setUnit] = useState<Unit>("toFah");
  const [result, setResult] = useState<string>("32.00 °F");

  const convert = (value: string, currentUnit: Unit) => {
    const tempNum = parseFloat(value);
    if (isNaN(tempNum)) {
      setResult("Please enter a number");
      return;
    }

    if (currentUnit === "toFah") {
      const converted = (tempNum * 9) / 5 + 32;
      setResult(`${converted.toFixed(2)} °F`);
    } else {
      const converted = ((tempNum - 32) * 5) / 9;
      setResult(`${converted.toFixed(2)} °C`);
    }
  };

  const handleInputChange = (value: string) => {
    setVal(value);
    convert(value, unit);
  };

  const handleUnitChange = (newUnit: Unit) => {
    setUnit(newUnit);
    convert(val, newUnit);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-12 min-h-[400px] rounded-3xl bg-white border border-slate-100 shadow-xl max-w-md mx-auto">
      <h3 className="text-sm font-semibold tracking-widest text-teal-650 uppercase mb-8">
        Temperature Converter
      </h3>

      <div className="w-full flex flex-col gap-5 mb-8">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Temperature Value
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter temperature"
            className="w-full px-4 py-3 border-2 border-slate-200 focus:border-teal-400 focus:outline-none rounded-xl text-center text-xl font-bold text-slate-800 bg-white"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Conversion Direction
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 p-3.5 border-2 border-slate-100 rounded-xl hover:border-teal-200 cursor-pointer transition-colors">
              <input
                type="radio"
                name="unit"
                checked={unit === "toFah"}
                onChange={() => handleUnitChange("toFah")}
                className="w-4 h-4 text-teal-650 focus:ring-teal-500"
              />
              <span className="text-sm font-bold text-slate-700">Celsius to Fahrenheit (°C → °F)</span>
            </label>

            <label className="flex items-center gap-3 p-3.5 border-2 border-slate-100 rounded-xl hover:border-teal-200 cursor-pointer transition-colors">
              <input
                type="radio"
                name="unit"
                checked={unit === "toCel"}
                onChange={() => handleUnitChange("toCel")}
                className="w-4 h-4 text-teal-650 focus:ring-teal-500"
              />
              <span className="text-sm font-bold text-slate-700">Fahrenheit to Celsius (°F → °C)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="w-full text-center bg-teal-50 p-5 rounded-2xl border border-teal-100/60">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-widest block mb-1">
          Result
        </span>
        <span className="text-3xl font-extrabold text-teal-900 tracking-tight">
          {result}
        </span>
      </div>
    </div>
  );
}
