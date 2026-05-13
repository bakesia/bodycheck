import React from "react";
import { FaUser, FaHistory } from "react-icons/fa";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      // 로그아웃 로직 (예: 로컬스토리지 삭제 등)
      window.location.href = "/";
    }
  };

  const menuItems = [
    { id: "profile", label: "내 프로필", icon: <FaUser /> },
    { id: "history", label: "내 분석 이력", icon: <FaHistory /> },
  ];

  return (
    <aside className="w-full md:w-80 bg-white p-8 flex flex-col border-r-2 border-black h-[calc(100vh-68px)] sticky top-[68px]">
      {/* 상단 타이틀 영역 */}
      <div className="mb-12">
        <h2 className="text-3xl font-black tracking-tighter uppercase border-b-4 border-black pb-3">
          대시보드
        </h2>
        <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-[0.2em] uppercase">
          User Profile Page
        </p>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 border-2 ${
              activeTab === item.id
                ? "bg-black text-white border-black"
                : "bg-white text-gray-400 border-transparent hover:border-gray-100 hover:text-black"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* 하단 로그아웃 영역 */}
      <div className="pt-8 border-t border-gray-400">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 text-sm font-black uppercase tracking-widest text-black hover:text-white hover:bg-black transition-all border-2 border-transparent"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
