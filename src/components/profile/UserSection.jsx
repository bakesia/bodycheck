import React from "react";
import { FaUser, FaEnvelope, FaCalendarAlt, FaChartLine } from "react-icons/fa";

export default function UserSection() {
  // 백엔드 통신용 더미 데이터
  const userData = {
    nickname: "tuser",
    email: "tuser@example.com",
    joinedDate: "2026.04.12",
    totalAnalysis: 42,
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-16">
      {/* 상단 프로필 헤더 */}
      <div className="flex items-center gap-10">
        {/* 프로필 이미지 */}
        <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-full shrink-0 border-2 border-black overflow-hidden">
          <FaUser size={60} className="text-gray-300 translate-y-2" />
        </div>

        {/* 닉네임 섹션 */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            User Nickname
          </span>
          <h3 className="text-4xl font-black text-black tracking-tighter">
            {userData.nickname}
          </h3>
        </div>
      </div>

      {/* 메인 정보 구역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
        {/* 계정 세부 정보 */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
            Account Info
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-gray-400" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Email Address
                </p>
                <p className="text-base font-bold">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Joined Since
                </p>
                <p className="text-base font-bold">{userData.joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 활동 통계 */}
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2">
            Activity Stats
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaChartLine className="text-gray-400" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">
                  Total Analysis
                </p>
                <p className="text-base font-bold">
                  {userData.totalAnalysis} Times
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 수정 버튼 */}
      <div className="pt-12 border-t-2 border-black space-y-8">
        <div className="flex flex-col gap-4">
          <button className="w-full md:w-fit px-12 py-4 border-2 border-black text-[12px] font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-black hover:text-white transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
