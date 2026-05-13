import React, { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import UserManagement from "../components/admin/UserManagement";
import HistoryManagement from "../components/admin/HistoryManagement";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-[calc(100vh-68px)] bg-white flex flex-col md:flex-row">
      {/* 사이드바 */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 메인 영역 */}
      <main className="flex-1 p-8 md:p-12 overflow-x-hidden">
        <div className="max-w-none">
          {activeTab === "users" && <UserManagement />}
          {activeTab === "history" && <HistoryManagement />}
        </div>
      </main>
    </div>
  );
}
