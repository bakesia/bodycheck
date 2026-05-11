import React from "react";

export default function ProfileSidebar({ activeTab, setActiveTab }) {
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      // 로그아웃 로직 (예: 로컬스토리지 삭제 등)
      window.location.href = "/";
    }
  };

  const menus = [
    { id: "profile", label: "My Profile" },
    { id: "history", label: "Analysis History" },
  ];

  return (
    <aside className="w-72 border-r-2 border-black flex flex-col justify-between py-12 h-screen sticky top-0 bg-white shrink-0">
      {/* 타이틀과 메인 메뉴 */}
      <div className="space-y-12">
        <div className="px-8">
          <h1 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black pb-2 inline-block">
            Dashboard
          </h1>
        </div>

        <nav className="flex flex-col space-y-1 px-4">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`text-left px-6 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === menu.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-400 hover:text-black hover:bg-gray-50"
              }`}
            >
              {menu.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="px-4">
        <button
          onClick={handleLogout}
          className="w-full text-left px-6 py-5 text-sm font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:bg-black transition-all"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
