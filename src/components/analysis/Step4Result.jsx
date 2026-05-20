import React, { useRef, useMemo } from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import useAnalysisStore from "../../store/useAnalysisStore";
import useUserStore from "../../store/useUserStore";
import useStyleSync from "../../hooks/useStyleSync";

export default function Step4Result() {
  const { mode, selectedTags, customRequest, analysisResult, reset } =
    useAnalysisStore();
  const { user } = useUserStore();

  const { runStyleSync, syncingIndex, composedUrl, composeError } =
    useStyleSync();

  const results = useMemo(() => {
    return analysisResult?.recommendations || [];
  }, [analysisResult]);

  const totalAccuracy = useMemo(() => {
    if (!results || results.length === 0) return "0.0";
    const sum = results.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const avg = sum / results.length;
    return (avg * 100).toFixed(1);
  }, [results]);

  // 드래그 컴포넌트용 제약조건 Ref 셋업
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
                <p className="text-sm font-black mt-2">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Height / Build
                </p>
                <p className="text-sm font-black mt-2">
                  {user?.height}cm /{" "}
                  {analysisResult?.body_info?.overall_build === "full"
                    ? "체격 좋음"
                    : "보통"}
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

      {/* 2. 중앙: 분석 결과 (가로 드래그 스크롤 카드) */}
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
            {results.map((item, index) => {
              const itemAccuracy = Math.round((item.score || 0) * 100);

              return (
                <div
                  key={item.id || index}
                  className="flex-none w-[320px] md:w-95 flex flex-col border-4 border-black bg-white select-none"
                >
                  {/* 카드 내부는 pointer-events-none을 걸어 드래그 스크롤 최적화 */}
                  <div className="pointer-events-none aspect-3/4 bg-gray-50 flex items-center justify-center overflow-hidden border-b-4 border-black">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
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

                  <div className="pointer-events-none p-6 flex flex-col gap-6 flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          {item.category
                            ? `${item.category}`
                            : `${index + 1}번째 추천`}
                        </p>
                        <div className="w-3 h-3 bg-black" />
                      </div>
                      <p className="text-base font-black text-black uppercase leading-tight h-12 line-clamp-2">
                        {item.title}
                      </p>
                      <p className="text-xs font-bold text-gray-400 normal-case line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="bg-black p-5 border-4 border-black">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-black text-white uppercase tracking-tighter">
                          적합도
                        </span>
                        <span className="text-lg font-black text-white leading-none">
                          {itemAccuracy}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-1000 ease-out"
                          style={{ width: `${itemAccuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 버튼 구역만 pointer-events-auto로 복구하여 클릭 활성화 */}
                  {mode === "mode1" && (
                    <div className="px-6 pb-6 pointer-events-auto">
                      <button
                        type="button"
                        disabled={syncingIndex !== null}
                        onClick={() => runStyleSync(item, index)}
                        className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest border-4 border-black hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {syncingIndex === index ? "합성 중…" : "가상 피팅하기"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* 가상 피팅 결과 디스플레이 보드 */}
      {(composedUrl || composeError) && (
        <section className="animate-in slide-in-from-bottom-10 duration-500 space-y-6">
          <div className="border-l-8 border-black pl-5">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
              사진 합성 결과 보드
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-widest">
              선택한 의상기반 실시간 가상 피팅 시뮬레이션 결과입니다.
            </p>
          </div>

          <div className="border-4 border-black bg-white p-8">
            {composeError && (
              <div className="p-4 border-4 border-black bg-red-50 text-red-700 font-bold text-sm">
                에러 발생: {composeError}
              </div>
            )}

            {composedUrl && (
              <div className="relative max-w-md mx-auto border-4 border-black bg-gray-50 p-4">
                <img
                  src={composedUrl}
                  alt="Virtual Fitting Result"
                  className="w-full h-auto object-contain border-4 border-black bg-white"
                />
                <div className="absolute top-6 right-6 bg-black text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]">
                  Live Preview
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. 하단 섹션 및 매칭 총점 바 */}
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
            AI 분석 결과, {user?.name}님의 체형 시그널과 선택하신 "
            {analysisResult?.generated_prompt || "취향 키워드"}" 기반 최적의
            코디네이션 밸런스입니다. 위 리스트는 {totalAccuracy}%의 종합
            신뢰도를 보장합니다.
          </p>
          <div className="w-full h-4 border-2 border-black bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-1000 ease-out"
              style={{ width: `${totalAccuracy}%` }}
            />
          </div>
        </div>
      </section>

      {/* 테스트 종료 및 스토어 초기화 버튼 */}
      <div className="pt-10 flex justify-center">
        <button
          onClick={() => {
            reset;
          }}
          className="w-full md:w-1/2 py-8 bg-black text-white text-base font-black uppercase tracking-[0.6em] border-4 border-black hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1"
        >
          Finish Analysis
        </button>
      </div>
    </div>
  );
}
