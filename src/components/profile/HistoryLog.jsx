import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function HistoryLog() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  // 데이터 가져오기 시뮬레이션
  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      // 내부 데이터는 백엔드 형식(English) 유지
      const dummyData = [
        {
          id: "anls_001",
          date: "2026.05.12",
          modeName: "Mode 01. Mood",
          tags: ["Sunny", "Navy", "Street"],
          summary:
            "Based on the user's physical data, we analyzed the optimal style combination for the selected tags.",
        },
        {
          id: "anls_002",
          date: "2026.05.10",
          modeName: "Mode 02. Closet",
          tags: ["Cloudy", "Top", "Office"],
          summary:
            "Matched the selected clothing items with the user's body type to derive the best business casual look.",
        },
      ];
      setHistory(dummyData);
    } catch (error) {
      console.error("Data Load Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 w-full mb-20 text-left">
      {/* 테이블 헤더 - UI 명칭은 한글 */}
      <div className="grid grid-cols-12 border-b-4 border-black py-5 px-4 text-[15px] font-black text-black bg-gray-50">
        <div className="col-span-2">일시</div>
        <div className="col-span-3">모드 구분</div>
        <div className="col-span-6 text-center">선택한 태그</div>
        <div className="col-span-1 text-right">상세</div>
      </div>

      {/* 로그 리스트 */}
      <div className="flex flex-col">
        {history.map((log) => (
          <div
            key={log.id}
            className="border-b-2 border-gray-100 last:border-b-4 last:border-black"
          >
            {/* 메인 행 */}
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
                {log.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] border px-2 py-0.5 font-black uppercase tracking-tighter ${
                      expandedId === log.id
                        ? "border-white text-white"
                        : "border-black text-black"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="col-span-1 text-right flex justify-end">
                <FaChevronDown
                  className={`transition-transform duration-500 ${
                    expandedId === log.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* 상세 영역 */}
            {expandedId === log.id && (
              <div className="p-10 flex flex-col md:flex-row gap-12 bg-white border-b-2 border-black animate-in slide-in-from-top-2 duration-300">
                {/* 결과 사진 박스 */}
                <div className="w-full md:w-64 aspect-3/4 bg-gray-100 border-4 border-black flex items-center justify-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Result Image
                  </span>
                </div>

                {/* 분석 레포트 내역 */}
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
