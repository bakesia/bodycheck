import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../store/useUserStore";

export default function Header() {
  // 스토어에서 로그인 여부(isLoggedIn)와 유저 데이터(user)
  const { isLoggedIn, user } = useUserStore();

  return (
    <div className="border-b border-gray-200 py-4 px-8 flex justify-between items-center bg-white sticky top-0 z-50">
      <span className="font-bold text-2xl tracking-tight text-black select-none">
        BODYCHECK.AI
      </span>

      <nav className="flex space-x-8 text-sm font-medium text-gray-600 items-center">
        {/* 항상 출력 (공용 영역) */}
        <Link
          to="/"
          className="hover:text-gray-950 hover:font-bold transition-all uppercase"
        >
          Home
        </Link>

        {/* 로그인 시에만 출력 (My Page) */}
        {isLoggedIn && (
          <Link
            to="/profile"
            className="hover:text-gray-950 hover:font-bold transition-all uppercase"
          >
            My Page
          </Link>
        )}

        {isLoggedIn && (
          <Link
            to="/analysis"
            className="hover:text-gray-950 hover:font-bold transition-all uppercase"
          >
            analysis
          </Link>
        )}

        {/* 비로그인 시에만 출력 (Login) */}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="hover:text-gray-950 hover:font-bold transition-all uppercase"
          >
            login
          </Link>
        )}

        {/* 로그인 완 + 권한이 'admin'인 치트키 유저에게만 노출 */}
        {isLoggedIn && user?.role === "admin" && (
          <Link
            to="/admin"
            className="text-black font-black border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-all text-[11px] tracking-widest"
          >
            ADMIN
          </Link>
        )}
      </nav>
    </div>
  );
}
