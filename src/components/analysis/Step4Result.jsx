import React, { useRef, useMemo } from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import useAnalysisStore from "../../store/useAnalysisStore";
import useUserStore from "../../store/useUserStore";

export default function Step4Result() {
  const { mode, selectedTags, customRequest, analysisResult, reset } =
    useAnalysisStore();
  const { user } = useUserStore();

  const results = useMemo(
    () =>
      analysisResult?.items || [
        { name: "Oversized Wool Blazer", accuracy: 98.2 },
        { name: "Straight Fit Denim", accuracy: 94.5 },
        { name: "White Basic Tee", accuracy: 91.0 },
        { name: "Minimal Leather Shoes", accuracy: 88.7 },
        { name: "Silver Buckle Belt", accuracy: 85.4 },
      ],
    [analysisResult],
  );

  const totalAccuracy = useMemo(() => {
    return (
      analysisResult?.totalAccuracy ||
      (
        results.reduce((acc, curr) => acc + curr.accuracy, 0) / results.length
      ).toFixed(1)
    );
  }, [analysisResult, results]);

  // 숫자로 계산 안 하고 Ref로 직접 제약 조건 설정
  const constraintsRef = useRef(null);

  return (
    <div className="space-y-16 font-sans antialiased pb-20 text-left animate-in fade-in duration-700">
      {/* 1. 상단: 분석 리포트 요약 */}
      <section className="space-y-6">
        <div className="border-l-8 border-black pl-5">
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
            Analysis Report
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-widest">
            {mode === "mode1" ? "MODE 01. MOOD" : "MODE 02. CLOSET"} 분석 결과
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-4 border-black bg-white">
          <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black space-y-4">
            <h3 className="text-sm font-black">01. 유저 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Name
                </p>
                <p className="text-sm font-black mt-2">{user.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Height / Gender
                </p>
                <p className="text-sm font-black mt-2">
                  {user.height}cm / {user.gender === "male" ? "남성" : "여성"}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-black">02. 선택한 태그</h3>
            <div className="flex flex-wrap gap-2 mt-5">
              {selectedTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-black text-white text-sm font-black uppercase tracking-widest"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          {customRequest && (
            <div className="col-span-1 md:col-span-2 p-6 border-t-2 border-black bg-gray-50">
              <h3 className="text-sm font-black uppercase mb-2">
                03. Custom Request
              </h3>
              <p className="text-sm font-bold text-black leading-relaxed">
                - {customRequest}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. 중앙: 분석 결과 (Framer Motion - 버그 해결 버전) */}
      <section className="space-y-8">
        <div className="flex justify-between items-end border-b-4 border-black pb-2">
          <h3 className="text-xl font-black uppercase tracking-tighter">
            Matching Result : {results.length} Items Found
          </h3>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Drag or Flick to Explore ↔
          </span>
        </div>

        <motion.div
          ref={constraintsRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            className="flex gap-8 w-max px-2"
          >
            {results.map((item, index) => (
              <div
                key={index}
                className="flex-none w-[320px] md:w-95 flex flex-col border-4 border-black bg-white select-none pointer-events-none"
              >
                {/* 이미지 영역 */}
                <div className="aspect-3/4 bg-gray-50 flex items-center justify-center overflow-hidden border-b-4 border-black">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-xs font-black">
                        0{index + 1}
                      </div>
                      <div className="text-[10px] font-black text-black/20 uppercase">
                        No Item Image
                      </div>
                    </div>
                  )}
                </div>

                {/* 정보 영역 */}
                <div className="p-6 flex flex-col gap-6 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        {index + 1}번째 의상
                      </p>
                      <div className="w-3 h-3 bg-black" />
                    </div>
                    <p className="text-base font-black text-black uppercase leading-tight h-12 line-clamp-2">
                      {item.name}
                    </p>
                  </div>

                  {/* 정확도 지표 */}
                  <div className="bg-black p-5 border-4 border-black">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-sm font-black text-white uppercase tracking-tighter">
                        정확도
                      </span>
                      <span className="text-lg font-black text-white leading-none">
                        {item.accuracy}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-1000 ease-out"
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 3. 하단 섹션 및 버튼 */}
      <section className="p-8 border-4 border-black flex flex-col md:flex-row items-center justify-between gap-8 bg-white">
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
            Total Matching Score
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black tracking-tighter">
              {totalAccuracy}%
            </span>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md space-y-4">
          <p className="text-xs font-bold text-gray-500 leading-relaxed uppercase">
            AI 분석 결과, {user.name}님의 체형과 선택하신 취향을 기반으로 도출된
            최적의 코디네이션입니다. 위 리스트는 {totalAccuracy}%의 신뢰도를
            보장합니다.
          </p>
          <div className="w-full h-4 border-2 border-black bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-1000 ease-out"
              style={{ width: `${totalAccuracy}%` }}
            />
          </div>
        </div>
      </section>

      <div className="pt-10 flex justify-center">
        <button
          onClick={reset}
          className="w-full md:w-1/2 py-8 bg-black text-white text-base font-black uppercase tracking-[0.6em] border-4 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1"
        >
          Finish Analysis
        </button>
      </div>
    </div>
  );
}
