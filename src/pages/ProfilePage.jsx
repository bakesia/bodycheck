import React, { useState, useEffect } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import UserSection from "../components/profile/UserSection";
import HistoryLog from "../components/profile/HistoryLog";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { metadata, isLoading, fetchMetadata } = useProfile();

  // 최초 로드 시 메타데이터 긁어오기
  useEffect(() => {
    fetchMetadata();
  }, []);

  if (isLoading && !metadata) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white">
        <div className="text-xl font-black animate-pulse uppercase tracking-widest text-black">
          데이터 동기화 중...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-68px)] bg-white font-sans antialiased">
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-12 md:p-20 bg-white">
        <div className="w-full mx-auto">
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-left">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-5">
                Profile
              </h2>
              <div className="border-t-[6px] border-black pt-12">
                <UserSection
                  joinedDate={metadata?.joinedDate || "0000.00.00"}
                  totalAnalysis={metadata?.totalAnalysis || 0}
                />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-left">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-5">
                History
              </h2>
              <div className="border-t-[6px] border-black pt-12">
                <HistoryLog />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
