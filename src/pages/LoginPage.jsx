import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useFindPw } from "../hooks/useFindPw";
import { FaUser, FaLock, FaTimes, FaSearch } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();

  // 로그인, 비번 찾기 커스텀 훅
  const { handleLoginSubmit, isLoading } = useLogin();
  const { handleFindPwSubmit, isSearching, foundPw, resetFoundPw } =
    useFindPw();

  const [showModal, setShowModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [findEmail, setFindEmail] = useState("");

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. 실전 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    handleLoginSubmit(loginData.email, loginData.password, () => {
      alert("로그인 성공!");
      navigate("/analysis");
    });
  };

  // 2. 실전 비밀번호 찾기 처리
  const handleFindPw = () => {
    if (!findEmail) return alert("가입하신 이메일을 입력해주세요.");
    handleFindPwSubmit(findEmail);
  };

  const closeModal = () => {
    setShowModal(false);
    resetFoundPw();
    setFindEmail("");
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white px-6 font-sans antialiased">
      <div className="w-full max-w-md border-2 border-black p-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
        {/* 타이틀 영역 */}
        <div className="text-left mb-12 border-l-4 border-black pl-4">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
            Login
          </h1>
          <p className="text-base text-gray-500 mt-2 font-bold uppercase tracking-widest leading-tight">
            당신에게 걸맞는 옷을 체계적으로 관리해 보세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group text-left">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaUser size={14} />
            </div>
            <input
              required
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="EMAIL ADDRESS"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

          <div className="relative group text-left">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaLock size={14} />
            </div>
            <input
              required
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="PASSWORD"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-black text-white font-black text-base uppercase hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:bg-gray-400"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="mt-10 flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
          <Link
            to="/signup"
            className="text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black"
          >
            Create Account
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black"
          >
            PW 찾기
          </button>
        </div>
      </div>

      {/* PW 찾기 모달 영역 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md bg-white border-4 border-black p-10 animate-in zoom-in duration-300 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:scale-110 transition-transform"
            >
              <FaTimes size={20} />
            </button>

            <div className="space-y-8 text-left">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black inline-block mb-2 italic">
                  Password Recovery
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                  가입 시 사용한 이메일을 입력해주세요
                </p>
              </div>

              {!foundPw ? (
                /* 비번 찾기 입력창 */
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={findEmail}
                      onChange={(e) => setFindEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL"
                      className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold placeholder-gray-200"
                    />
                  </div>
                  <button
                    onClick={handleFindPw}
                    disabled={isSearching}
                    className="w-full py-5 bg-black text-white font-black text-sm uppercase hover:bg-gray-800 transition-all disabled:bg-gray-400 flex items-center justify-center gap-3"
                  >
                    {isSearching ? (
                      <span className="animate-pulse">Searching...</span>
                    ) : (
                      <>
                        <FaSearch size={14} />
                        <span>Find Password</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* 찾은 비번 출력창 (마스킹) */
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-500">
                  <div className="p-8 bg-gray-50 border-4 border-black border-dashed text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-3">
                      Recovered Password
                    </p>
                    <p className="text-2xl font-black tracking-widest text-black font-mono">
                      {foundPw}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full py-5 bg-black text-white font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
