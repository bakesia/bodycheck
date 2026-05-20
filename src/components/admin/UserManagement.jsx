import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useAdminUsers from "../../hooks/useAdminUsers";

export default function UserManagement() {
  const { users, isLoading, loadUsers, removeUser } = useAdminUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDeleteUser = (userId, nickname) => {
    if (
      window.confirm(
        `${nickname} 회원을 정말로 탈퇴 처리하시겠습니까?\n(주의: 유저의 분석 이력도 연쇄 삭제됩니다.)`,
      )
    ) {
      removeUser(userId);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 섹션 헤더 */}
      <div className="border-b-4 border-black pb-4 mb-8">
        <h3 className="text-4xl font-black uppercase tracking-tighter">
          User Management
        </h3>
      </div>

      {/* 지표 요약 섹션 */}
      <div className="w-[30%] border-2 border-black p-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
          Total Count
        </p>
        <p className="text-5xl font-black tracking-tighter text-black">
          {users.length}
        </p>
      </div>

      {/* 테이블 영역 */}
      <div className="w-full overflow-x-auto mt-10">
        {isLoading ? (
          <div className="py-20 text-center font-black animate-pulse">
            유저 명단 로드 중…
          </div>
        ) : users.length === 0 ? (
          <div className="py-20 text-center border-4 border-dashed border-gray-100 font-black text-gray-300 uppercase">
            가입 유저가 없습니다.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-4 px-2 text-sm font-black uppercase tracking-widest text-black text-left w-16">
                  ID
                </th>
                <th className="py-4 px-2 text-sm font-black uppercase tracking-widest text-black text-left">
                  닉네임
                </th>
                <th className="py-4 px-2 text-sm font-black uppercase tracking-widest text-black text-left">
                  Email
                </th>
                <th className="py-4 px-2 text-sm font-black uppercase tracking-widest text-black text-left w-32">
                  가입 날짜
                </th>
                <th className="py-4 px-2 text-sm font-black uppercase tracking-widest text-black text-right w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const actualUserId = user.userId ?? user.id;
                // 백엔드가 준 날짜 가공 방어벽
                const displayDate = user.createdAt
                  ? user.createdAt.substring(0, 10).replace(/-/g, ".")
                  : "-";

                return (
                  <tr
                    key={actualUserId}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <td className="py-6 px-2 text-sm font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-6 px-2 text-sm font-black uppercase tracking-tight text-black">
                      {user.nickname}
                    </td>
                    <td className="py-6 px-2 text-sm font-bold text-gray-500">
                      {user.email}
                    </td>
                    <td className="py-6 px-2 text-[11px] font-bold text-gray-400 tracking-tighter">
                      {displayDate}
                    </td>
                    <td className="py-6 px-2 text-right">
                      <button
                        onClick={() =>
                          handleDeleteUser(actualUserId, user.nickname)
                        }
                        className="p-2 text-gray-300 hover:text-red-600 transition-colors"
                        title="Delete User"
                      >
                        <FaTrashAlt size={16} />
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
