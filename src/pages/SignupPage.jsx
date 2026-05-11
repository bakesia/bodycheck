import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheckCircle } from "react-icons/fa";

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white px-6 font-sans antialiased py-12">
      <div className="w-full max-w-md border-2 border-black p-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
        {/* 타이틀 영역 */}
        <div className="text-left mb-12 border-l-4 border-black pl-4">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-bold uppercase tracking-widest">
            새로운 스타일 여정을 시작하세요
          </p>
        </div>

        <form className="space-y-4">
          {/* 이름(닉네임) 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaUser size={14} />
            </div>
            <input
              type="text"
              placeholder="NICKNAME (이름)"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

          {/* 이메일 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaEnvelope size={14} />
            </div>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaLock size={14} />
            </div>
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaCheckCircle size={14} />
            </div>
            <input
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button className="w-full py-4 mt-6 bg-black text-white font-black text-base uppercase hover:bg-gray-800 transition-all active:scale-[0.98]">
            Sign Up
          </button>
        </form>

        {/* 하단 부가기능 */}
        <div className="mt-10 flex justify-center items-center text-sm font-black uppercase tracking-widest">
          <p className="text-gray-400">이미 계정이 있으신가요?</p>
          <Link
            to="/login"
            className="ml-4 text-black hover:underline transition-all"
          >
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
}
