import React from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function HistoryManagement() {
  const dummyLogs = [
    {
      id: "9234",
      userId: "1",
      nickname: "kim",
      mode: "Mode 1",
      date: "2026.03.25",
      time: "14:32:18",
      tags: ["sunny", "navy", "street"],
    },
    {
      id: "9233",
      userId: "2",
      nickname: "lee",
      mode: "Mode 2",
      date: "2026.03.25",
      time: "14:28:45",
      tags: ["cloudy", "top", "office"],
    },
    {
      id: "9232",
      userId: "3",
      nickname: "park",
      mode: "Mode 1",
      date: "2026.03.25",
      time: "14:15:22",
      tags: ["rainy", "red", "causal"],
    },
    {
      id: "9231",
      userId: "4",
      nickname: "choi",
      mode: "Mode 2",
      date: "2026.03.25",
      time: "13:58:09",
      tags: ["snowy", "bottom", "party"],
    },
  ];

  const handleDeleteLog = (logId) => {
    if (window.confirm(`해당 분석 기록(${logId})을 삭제하시겠습니까?`)) {
      console.log(`${logId} 삭제 요청됨`);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
      {/* 섹션 헤더 */}
      <div className="border-b-4 border-black pb-4">
        <h3 className="text-4xl font-black uppercase tracking-tighter text-black">
          History Management
        </h3>
      </div>

      {/* 지표 요약 섹션 */}
      <div className="w-[30%] border-2 border-black p-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
          Total Count
        </p>
        <p className="text-5xl font-black tracking-tighter text-black">
          {dummyLogs.length}
        </p>
      </div>

      {/* 테이블 영역 */}
      <div className="w-full overflow-x-auto pt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-left">
                Log ID
              </th>
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-left">
                User ID
              </th>
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-left">
                닉네임
              </th>
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-left">
                모드 구분
              </th>
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-left">
                날짜 / 시간
              </th>
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-left">
                선택한 태그
              </th>
              <th className="py-5 px-4 text-sm font-black uppercase tracking-widest text-black text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-base font-bold">
            {dummyLogs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-6 px-4 text-sm font-bold text-gray-400">
                  {log.id}
                </td>
                <td className="py-6 px-4 text-sm font-bold text-gray-400">
                  {log.userId}
                </td>
                <td className="py-6 px-4 text-lg font-black uppercase tracking-tight text-black">
                  {log.nickname}
                </td>
                <td className="py-6 px-4">
                  <span className="text-xs font-black border-2 border-black px-3 py-1 uppercase">
                    {log.mode}
                  </span>
                </td>
                <td className="py-6 px-4">
                  <p className="text-base font-bold text-gray-800 tracking-tighter">
                    {log.date}
                  </p>
                  <p className="text-sm font-bold text-gray-400 tracking-tighter">
                    {log.time}
                  </p>
                </td>
                <td className="py-6 px-4">
                  <div className="flex gap-1.5">
                    {log.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-sm font-black uppercase bg-gray-200 text-gray-600 px-2 py-1 w-fit"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-6 px-4 text-right">
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-3 text-gray-300 hover:text-red-600 transition-colors"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
