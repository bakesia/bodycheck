// src/components/analysis/Step3Loading.jsx
import React, { useEffect } from "react";
import useAnalysis from "../../hooks/useAnalysis";
import useAnalysisStore from "../../store/useAnalysisStore";

export default function Step3Loading() {
  const { mode } = useAnalysisStore();
  const { runAnalysis } = useAnalysis();

  useEffect(() => {
    runAnalysis();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-125 space-y-12 font-sans antialiased text-left">
      {/* 9칸 매트릭스 펄스 애니메이션 구역 */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 bg-black animate-matrix-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-black text-black uppercase tracking-[0.3em]">
          Analyzing...
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Request to: {mode}
        </p>

        <div className="flex justify-center">
          <div className="w-48 h-1 bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-black w-1/3 animate-loading-bar" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes matrix-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.4); opacity: 0.2; }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-matrix-pulse { animation: matrix-pulse 1.2s infinite ease-in-out; }
        .animate-loading-bar { animation: loading-bar 1.5s infinite linear; }
      `}</style>
    </div>
  );
}
