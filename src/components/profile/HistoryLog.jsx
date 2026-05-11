import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function HistoryLog() {
  // 현재 어떤 로그가 열려있는지 관리 (id 저장)
  const [expandedId, setExpandedId] = useState(null);

  const dummyLogs = [
    {
      id: "anls_001",
      date: "2026.05.12",
      mode: "mode1",
      modeName: "Mode 01. Mood",
      tags: ["Sunny", "Navy", "Street"],
    },
    {
      id: "anls_002",
      date: "2026.05.10",
      mode: "mode2",
      modeName: "Mode 02. Closet",
      tags: ["Cloudy", "Top", "Office"],
    },
    {
      id: "anls_003",
      date: "2026.05.08",
      mode: "mode1",
      modeName: "Mode 01. Mood",
      tags: ["Rainy", "Black", "Chic"],
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 w-full">
      {/* 테이블 헤더*/}
      <div className="grid grid-cols-12 border-b-2 border-black py-4 px-2 text-[15px] font-black uppercase tracking-widest text-black">
        <div className="col-span-2">Date</div>
        <div className="col-span-3">Analysis Mode</div>
        <div className="col-span-6">Applied Tags</div>
        <div className="col-span-1 text-right">Detail</div>
      </div>

      {/* 로그 리스트 */}
      <div className="flex flex-col">
        {dummyLogs.map((log) => (
          <div key={log.id} className="border-b border-gray-100">
            {/* 메인 행 (클릭 시 열림) */}
            <div
              onClick={() => toggleExpand(log.id)}
              className="grid grid-cols-12 py-6 px-2 items-center cursor-pointer hover:bg-gray-50 transition-colors group"
            >
              <div className="col-span-2 text-[11px] font-bold text-gray-400 tracking-tighter">
                {log.date}
              </div>
              <div className="col-span-3 text-xs font-black uppercase tracking-tight text-black">
                {log.modeName}
              </div>
              <div className="col-span-6 flex flex-wrap gap-2">
                {log.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[9px] border border-black px-2 py-0.5 text-black font-black uppercase tracking-tighter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="col-span-1 text-right flex justify-end">
                {/* 쐐기 아이콘: 열릴 때 180도 회전 애니메이션 */}
                <FaChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    expandedId === log.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* 슬라이드 열리는 상세 영역 */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${
                expandedId === log.id
                  ? "max-h-125 border-t border-gray-200"
                  : "max-h-0"
              }`}
            >
              <div className="p-8 flex gap-10">
                {/* 결과 이미지 플레이스홀더 (네모 박스) */}
                <div className="w-64 aspect-3/4 bg-gray-200 border-2 border-black flex items-center justify-center relative">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Result Image
                  </span>
                </div>

                {/* 결과 텍스트 요약 */}
                <div className="flex-1 space-y-4 pt-4">
                  <h4 className="text-xs font-black uppercase tracking-widest border-b border-black pb-2">
                    Analysis Summary
                  </h4>
                  <div className="space-y-2">
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                      해당 분석은 AI를 통해 사용자의 신체 3D 모델을 분석하여
                      최적의 매칭을 검색하였습니다. <br />
                      해당 결과는 선택하신{" "}
                      <span className="text-base text-black">
                        #{log.tags.join(" #")}
                      </span>{" "}
                      태그와 가장 알맞은 결과입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 데이터 없음 처리 */}
      {dummyLogs.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-gray-100 mt-4">
          <p className="text-xs font-black text-gray-300 uppercase tracking-widest">
            No Analysis History Found
          </p>
        </div>
      )}
    </div>
  );
}
