import React from "react";
import useAnalysisStore from "../store/useAnalysisStore";
import Step1Upload from "../components/analysis/Step1Upload";
import Step2Config from "../components/analysis/Step2Config";
import Step3Loading from "../components/analysis/Step3Loading";
import Step4Result from "../components/analysis/Step4Result";

export default function AnalysisPage() {
  const { step, setStep } = useAnalysisStore();

  return (
    <div className="min-h-[calc(100vh-68px)] bg-white py-16 px-6 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center mb-20">
          {[1, 2, 3, 4].map((num) => (
            <React.Fragment key={num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center text-sm font-black transition-all duration-300 border-2 ${
                    step === num
                      ? "bg-black text-white border-black" // 활성화 상태
                      : step > num
                        ? "bg-white text-black border-black" // 지나온 상태
                        : "bg-white text-gray-200 border-gray-100" // 대기 상태
                  }`}
                >
                  {num.toString().padStart(2, "0")}
                </div>
              </div>

              {/* 단계 사이 연결선 */}
              {num !== 4 && (
                <div
                  className={`w-15 h-0.5 mx-2 transition-all duration-500 ${
                    step > num ? "bg-black" : "bg-gray-100"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Area */}
        <main className="min-h-125">
          {step === 1 && <Step1Upload />}
          {step === 2 && <Step2Config />}
          {step === 3 && <Step3Loading />}
          {step === 4 && <Step4Result />}
        </main>

        {/* 테스트용 하단 버튼 */}
        <div className="mt-24 flex justify-between items-center border-t-2 border-black pt-10">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className="px-8 py-3 border-2 border-black text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
          >
            Prev
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.3em] text-black uppercase">
              Phase {step} / 04
            </span>
            <div className="w-10 h-1 bg-black mt-1" />
          </div>

          <button
            onClick={() => setStep(Math.min(4, step + 1))}
            className="px-8 py-3 border-2 border-black bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
