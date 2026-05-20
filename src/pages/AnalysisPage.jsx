import React, { useEffect } from "react";
import { useBlocker } from "react-router-dom";
import useAnalysisStore from "../store/useAnalysisStore";
import Step1Upload from "../components/analysis/Step1Upload";
import Step2Config from "../components/analysis/Step2Config";
import Step3Loading from "../components/analysis/Step3Loading";
import Step4Result from "../components/analysis/Step4Result";

export default function AnalysisPage() {
  const { step, setStep, images, reset } = useAnalysisStore();

  // 분석이 "진행 중(1, 2, 3단계)"이면서 + "데이터가 존재할 때"만 이탈을 차단함!
  const isDataExist = step < 4 && (step > 1 || images.user || images.item);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDataExist && currentLocation.pathname !== nextLocation.pathname,
  );

  // 브라우저 액션 차단 (새로고침, 탭 닫기)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDataExist) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDataExist]);

  // 페이지 이탈 시 스토어 리셋
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className="min-h-[calc(100vh-68px)] bg-white py-16 px-6 font-sans antialiased text-left">
      <div className="max-w-4xl mx-auto">
        {/* 상단 스텝 인디케이터 */}
        <div className="flex justify-center items-center mb-20">
          {[1, 2, 3, 4].map((num) => (
            <React.Fragment key={num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center text-sm font-black transition-all duration-300 border-2 ${
                    step === num
                      ? "bg-black text-white border-black"
                      : step > num
                        ? "bg-white text-black border-black"
                        : "bg-white text-gray-200 border-gray-100"
                  }`}
                >
                  {num.toString().padStart(2, "0")}
                </div>
              </div>
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

        {/* 컨텐츠 영역 */}
        <main className="min-h-125">
          {step === 1 && <Step1Upload />}
          {step === 2 && <Step2Config />}
          {step === 3 && <Step3Loading />}
          {step === 4 && <Step4Result />}
        </main>

        {/* 하단 컨트롤 바 */}
        <div className="mt-24 flex justify-between items-center border-t-2 border-black pt-10">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 3 || step === 1}
            className="px-8 py-3 border-2 border-black text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed"
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
            disabled={step === 3 || (step === 1 && !images.user)}
            className="px-8 py-3 border-2 border-black bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* 내부 이동 차단 커스텀 모달 */}
      {blocker.state === "blocked" && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white border-4 border-black p-10 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                Warning
              </h2>
              <p className="text-sm font-bold text-black leading-relaxed">
                지금 페이지를 나가면 진행 중인 분석 데이터가 모두 초기화됩니다.{" "}
                <br />
                정말 이동하시겠습니까?
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => blocker.reset()}
                  className="py-4 border-2 border-black text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  머무르기
                </button>
                <button
                  onClick={() => blocker.proceed()}
                  className="py-4 border-2 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-gray-600 transition-all"
                >
                  나가기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
