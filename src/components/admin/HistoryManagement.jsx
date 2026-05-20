import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useAdminHistory from "../../hooks/useAdminHistory";

export default function HistoryManagement() {
  const { histories, isLoading, loadHistories, removeHistory } =
    useAdminHistory();

  useEffect(() => {
    loadHistories();
  }, [loadHistories]);

  const handleDeleteLog = (logId) => {
    if (window.confirm(`해당 분석 기록(${logId})을 삭제하시겠습니까?`)) {
      removeHistory(logId);
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
          {histories.length}
        </p>
      </div>

      {/* 테이블 영역 */}
      <div className="w-full overflow-x-auto pt-4">
        {isLoading ? (
          <div className="py-20 text-center font-black animate-pulse">
            분석 이력 수집 중…
          </div>
        ) : histories.length === 0 ? (
          <div className="py-20 text-center border-4 border-dashed border-gray-100 font-black text-gray-300 uppercase">
            기록된 분석 내역이 없습니다.
          </div>
        ) : (
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
              {histories.map((log) => {
                const actualLogId = log.request_id ?? log.id;

                // 백이 준 ISOcreatedAt 날짜 및 시간 정규화 코드
                let displayDate = "-";
                let displayTime = "-";
                if (log.createdAt) {
                  displayDate = log.createdAt
                    .substring(0, 10)
                    .replace(/-/g, ".");
                  displayTime = log.createdAt.substring(11, 19);
                }

                // 파이썬 중괄호 데이터 기호 정상화용 코드
                const parsedTags = Array.isArray(log.tags)
                  ? log.tags
                  : typeof log.tags === "string"
                    ? log.tags
                        .replace(/[{}[\]"']/g, "")
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    : [];

                return (
                  <tr
                    key={actualLogId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-6 px-4 text-sm font-bold text-gray-400">
                      {actualLogId}
                    </td>
                    <td className="py-6 px-4 text-sm font-bold text-gray-400">
                      {log.userId}
                    </td>
                    <td className="py-6 px-4 text-lg font-black uppercase tracking-tight text-black">
                      {log.nickname || `User_${log.userId}`}
                    </td>
                    <td className="py-6 px-4">
                      <span className="text-xs font-black border-2 border-black px-3 py-1 uppercase bg-white text-black">
                        {log.mode}
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      <p className="text-base font-bold text-gray-800 tracking-tighter">
                        {displayDate}
                      </p>
                      <p className="text-sm font-bold text-gray-400 tracking-tighter">
                        {displayTime}
                      </p>
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex gap-1.5">
                        {parsedTags.map((tag, i) => (
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
                        onClick={() => handleDeleteLog(actualLogId)}
                        className="p-3 text-gray-300 hover:text-red-600 transition-colors"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
