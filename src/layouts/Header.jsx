import { Link } from "react-router-dom";

export default function Header() {
  // 나중에 전역 상태(Store)에서 가져올 유저 정보 예시
  // const user = { role: "admin" };

  return (
    <div className="border-b border-gray-200 py-4 px-8 flex justify-between items-center bg-white sticky top-0 z-50">
      <Link to="/" className="font-bold text-2xl tracking-tight text-black">
        BODYCHECK.AI
      </Link>

      <nav className="flex space-x-8 text-sm font-medium text-gray-600 items-center">
        <Link
          to="/"
          className="hover:text-gray-950 hover:font-bold transition-all uppercase"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="hover:text-gray-950 hover:font-bold transition-all uppercase"
        >
          My Page
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-950 hover:font-bold transition-all uppercase"
        >
          About
        </Link>

        <Link
          to="/login"
          className="hover:text-gray-950 hover:font-bold transition-all uppercase"
        >
          login
        </Link>

        {/* 
          [관리자 전용 로직] 
          나중에 아래 주석을 풀고 user.role === 'admin' 이런 식
        */}
        {/* {user.role === "admin" && ( */}
        <Link
          to="/admin"
          className="text-black font-black border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-all text-[11px] tracking-widest"
        >
          ADMIN
        </Link>
        {/* )} */}
      </nav>
    </div>
  );
}
