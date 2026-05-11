import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [foundPw, setFoundPw] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleFindPw = () => {
    if (!email) return alert("이메일을 입력해주세요.");

    setIsSearching(true);

    setTimeout(() => {
      const dummyRealPw = "gachon2026";
      const masked = dummyRealPw.slice(0, 3) + "**** " + dummyRealPw.slice(-3);

      setFoundPw(masked);
      setIsSearching(false);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
    setFoundPw("");
    setEmail("");
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white px-6 font-sans antialiased">
      <div className="w-full max-w-md border-2 border-black p-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-left mb-12 border-l-4 border-black pl-4">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
            Login
          </h1>
          <p className="text-base text-gray-500 mt-2 font-bold uppercase tracking-widest">
            당신에게 걸맞는 옷을 체계적으로 관리해 보세요
          </p>
        </div>

        <form className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
              <FaUser size={14} />
            </div>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
            />
          </div>

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

          <button className="w-full py-4 mt-4 bg-black text-white font-black text-base uppercase hover:bg-gray-800 transition-all active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <div className="mt-10 flex justify-between items-center text-sm font-black uppercase tracking-widest">
          <Link
            to="/signup"
            className="text-gray-400 hover:text-black transition-colors"
          >
            Create Account
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-400 hover:text-black transition-colors"
          >
            PW 찾기
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md bg-white border-4 border-black p-10 animate-in fade-in zoom-in duration-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:scale-110 transition-transform"
            >
              <FaTimes size={20} />
            </button>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black inline-block mb-2">
                  Password Recovery
                </h2>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                  가입 시 사용한 이메일을 입력해주세요
                </p>
              </div>

              {!foundPw ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="w-full px-4 py-4 bg-white border-2 border-black outline-none text-sm font-bold"
                  />
                  <button
                    onClick={handleFindPw}
                    disabled={isSearching}
                    className="w-full py-5 bg-black text-white font-black text-sm uppercase hover:bg-gray-800 transition-all disabled:bg-gray-400"
                  >
                    {isSearching ? "Searching..." : "Find Password"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-500">
                  <div className="p-6 bg-gray-50 border-2 border-dashed border-black text-center">
                    <p className="text-xs font-black text-gray-400 uppercase mb-2">
                      Recovered Password
                    </p>
                    <p className="text-xl font-black tracking-widest text-black">
                      {foundPw}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full py-5 bg-black text-white font-black text-sm uppercase transition-all"
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
