import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaTimes, FaSearch } from "react-icons/fa";
import useUserStore from "../store/useUserStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [showModal, setShowModal] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // 비밀번호 찾기 관련 상태
  const [findEmail, setFindEmail] = useState("");
  const [foundPw, setFoundPw] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();

    // [시뮬레이션] 백엔드 응답 데이터 구조 (명세서 기준)
    const mockResponse = {
      accessToken: "eyJhbGciOiJIUzI1Ni...", // 서버에서 준 토큰
      user: {
        id: "12345", // 서버에서 준 고유 ID
        name: "tuser",
        email: loginData.email,
        gender: "male",
        height: 180,
        weight: 75,
        role: "user",
      },
    };

    // 이제 updateUser 대신 login 함수를 호출해
    // 이 한 줄로 스토어 저장 + 로컬스토리지 저장이 동시에 끝남
    login(mockResponse.user, mockResponse.accessToken);

    alert("로그인 성공!");
    navigate("/");
  };

  // 2. 비밀번호 찾기 함수 (마스킹 버전)
  const handleFindPw = () => {
    if (!findEmail) return alert("가입하신 이메일을 입력해주세요.");

    setIsSearching(true);

    // 서버 통신 시뮬레이션
    setTimeout(() => {
      // 서버에서 가져온 실제 비밀번호라고 가정 (예: 6자 혹은 10자 등)
      const dummyRealPw = "gachon2026";
      const len = dummyRealPw.length;

      /**
       * [동적 마스킹 로직]
       * visible: 앞뒤로 보여줄 글자 수 (길이의 약 1/4, 최소 1자)
       * maskCount: 중간에 채울 별(*)의 개수 (전체 길이 - 노출 글자들)
       */
      const visible = Math.max(1, Math.floor(len / 4));
      const maskCount = len - visible * 2;

      const masked =
        dummyRealPw.slice(0, visible) +
        "*".repeat(maskCount) +
        dummyRealPw.slice(-visible);

      setFoundPw(masked);
      setIsSearching(false);
    }, 1200);
  };

  const closeModal = () => {
    setShowModal(false);
    setFoundPw("");
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

          <button className="w-full py-4 mt-4 bg-black text-white font-black text-base uppercase hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
            Sign In
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
