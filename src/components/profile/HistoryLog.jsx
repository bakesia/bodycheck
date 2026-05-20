import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useHistory } from "../../hooks/useHistory"; // 👈 이력 훅 장착

export default function HistoryLog() {
  const { history, isLoading, fetchHistory } = useHistory();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 w-full mb-20 text-left">
      <div className="grid grid-cols-12 border-b-4 border-black py-5 px-4 text-[15px] font-black text-black bg-gray-50">
        <div className="col-span-2">일시</div>
        <div className="col-span-3">모드 구분</div>
        <div className="col-span-6 text-center">선택한 태그</div>
        <div className="col-span-1 text-right">상세</div>
      </div>

      <div className="flex flex-col">
        {history.map((log) => (
          <div
            key={log.id}
            className="border-b-2 border-gray-100 last:border-b-4 last:border-black"
          >
            <div
              onClick={() => toggleExpand(log.id)}
              className={`grid grid-cols-12 py-7 px-4 items-center cursor-pointer transition-all ${
                expandedId === log.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-50 text-black"
              }`}
            >
              <div className="col-span-2 text-xs font-bold opacity-60 font-mono">
                {log.date}
              </div>
              <div className="col-span-3 text-sm font-black">
                {log.modeName}
              </div>
              <div className="col-span-6 flex flex-wrap gap-2 justify-center">
                {log.tags.map((tag, idx) => {
                  // 문자열 내부에 숨어있는 백엔드 찌꺼기 기호들({}, [], '") 싹 다 제거
                  const cleanTag =
                    typeof tag === "string"
                      ? tag.replace(/[{}[\]"']/g, "").trim()
                      : tag;

                  // 만약 백엔드가 배열이 아니라 통짜 문자열 하나로 줬다면 공백 처리가 안 될 수 있으니 예외 처리
                  if (!cleanTag) return null;

                  return (
                    <span
                      key={idx}
                      className={`text-[10px] border px-2 py-0.5 font-black uppercase tracking-tighter ${
                        expandedId === log.id
                          ? "border-white text-white"
                          : "border-black text-black"
                      }`}
                    >
                      #{cleanTag}
                    </span>
                  );
                })}
              </div>
              <div className="col-span-1 text-right flex justify-end">
                <FaChevronDown
                  className={`transition-transform duration-500 ${expandedId === log.id ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {expandedId === log.id && (
              <div className="p-10 flex flex-col md:flex-row gap-12 bg-white border-b-2 border-black animate-in slide-in-from-top-2 duration-300">
                {/* 결과 사진 박스 (백엔드 명세에 이미지 경로가 추가된다면 src에 바인딩 가능) */}
                <div className="w-full md:w-64 aspect-3/4 bg-gray-100 border-4 border-black flex items-center justify-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Result Image
                  </span>
                </div>

                <div className="flex-1 space-y-6">
                  <h4 className="text-xl font-black border-b-4 border-black pb-2 inline-block">
                    분석 레포트
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-6 border-l-8 border-black font-bold text-sm text-gray-700 leading-relaxed">
                      {log.summary}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="py-20 text-center font-black animate-pulse">
          로그 로딩 중...
        </div>
      )}
      {!isLoading && history.length === 0 && (
        <div className="py-20 text-center border-4 border-dashed border-gray-100 mt-8 font-black text-gray-300 uppercase">
          히스토리가 비어있습니다.
        </div>
      )}
    </div>
  );
}
