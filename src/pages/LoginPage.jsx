import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa"; // react-icons 사용

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white px-6 font-sans">
      <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
        {/* 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-black">
            LOGIN
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            서비스 이용을 위해 로그인해주세요.
          </p>
        </div>

        <form className="space-y-4">
          {/* 아이디 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-gray-950 transition-colors">
              <FaUser size={16} />
            </div>
            <input
              type="email"
              placeholder="이메일"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-gray-950 transition-all placeholder-gray-300"
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-gray-950 transition-colors">
              <FaLock size={16} />
            </div>
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-gray-950 transition-all placeholder-gray-300"
            />
          </div>

          {/* 로그인 버튼 */}
          <button className="w-full py-4 mt-4 bg-gray-950 text-white rounded-lg font-bold text-lg hover:bg-black transition-all active:scale-[0.98]">
            로그인
          </button>
        </form>

        {/* 하단 부가 기능 */}
        <div className="mt-8 flex justify-center items-center text-sm">
          <Link
            to="/signup"
            className="text-gray-400 hover:text-gray-950 font-semibold transition-colors"
          >
            계정 만들기
          </Link>
          <span className="mx-5"></span>
          <button className="text-gray-400 hover:text-gray-950 font-semibold transition-colors">
            아이디/비번 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
