import React from "react";
import { FaUsers, FaHistory } from "react-icons/fa";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "users", label: "유저 관리", icon: <FaUsers /> },
    { id: "history", label: "내역 관리", icon: <FaHistory /> },
  ];

  return (
    <aside className="w-full md:w-80 bg-white p-8 flex flex-col border-r border-gray-100">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tighter uppercase border-b-4 border-black pb-3">
          관리자 페이지
        </h2>
        <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-[0.2em] uppercase">
          System Management Page
        </p>
      </div>

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

      <div className="pt-8 border-t border-gray-100 text-[10px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
        Authorized Personnel Only <br />© 2026 BuildLog
      </div>
    </aside>
  );
}
