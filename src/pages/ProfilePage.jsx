import React, { useState } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import UserSection from "../components/profile/UserSection";
import HistoryLog from "../components/profile/HistoryLog";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex min-h-[calc(100vh-68px)] bg-white font-sans antialiased">
      {/* 좌측 사이드바 */}
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 우측 메인 컨텐츠  */}
      <main className="flex-1 p-12 md:p-20 bg-white">
        <div className="w-full mx-auto">
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-5">
                Profile
              </h2>
              <div className="border-t-3 border-black pt-12">
                <UserSection />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-5">
                History
              </h2>
              <div className="border-t-3 border-black pt-12">
                <HistoryLog />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
