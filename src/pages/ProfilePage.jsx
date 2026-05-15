import React, { useState, useEffect } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import UserSection from "../components/profile/UserSection";
import HistoryLog from "../components/profile/HistoryLog";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileMetadata, setProfileMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 프로필 진입 시 상세 정보(가입일, 분석 횟수 등) 요청
    const fetchProfileMetadata = async () => {
      setLoading(true);
      try {
        // 실제 서비스 시: const res = await axios.get('/api/user/profile/detail');
        // 지금은 시뮬레이션 데이터
        const dummyMetadata = {
          joinedDate: "2026.04.12",
          totalAnalysis: 42,
        };
        setProfileMetadata(dummyMetadata);
      } catch (error) {
        console.error("프로필 상세 데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileMetadata();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white">
        <div className="text-xl font-black animate-pulse uppercase tracking-widest">
          데이터 동기화 중...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-68px)] bg-white font-sans antialiased">
      {/* 좌측 사이드바 */}
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 우측 메인 컨텐츠  */}
      <main className="flex-1 p-12 md:p-20 bg-white">
        <div className="w-full mx-auto">
          {activeTab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-left">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-5">
                Profile
              </h2>
              <div className="border-t-[6px] border-black pt-12">
                {/* 받아온 상세 정보를 Props로 전달 */}
                <UserSection
                  joinedDate={profileMetadata.joinedDate}
                  totalAnalysis={profileMetadata.totalAnalysis}
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
