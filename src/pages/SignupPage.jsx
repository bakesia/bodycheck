import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheckCircle } from "react-icons/fa"; // react-icons 사용

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white px-6 font-sans py-12">
      <div className="w-full max-w-md border border-gray-200 rounded-3xl p-10 shadow-sm">
        {/* 타이틀 영역 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-black">
            SIGN UP
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            새로운 스타일 여정을 시작하세요.
          </p>
        </div>

        <form className="space-y-4">
          {/* 이름(닉네임) 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-gray-950 transition-colors">
              <FaUser size={16} />
            </div>
            <input
              type="text"
              placeholder="이름 (닉네임)"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-gray-950 transition-all placeholder-gray-300"
            />
          </div>

          {/* 이메일 입력 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-gray-950 transition-colors">
              <FaEnvelope size={16} />
            </div>
            <input
              type="email"
              placeholder="이메일 주소"
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

          {/* 비밀번호 확인 */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-gray-950 transition-colors">
              <FaCheckCircle size={16} />
            </div>
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg outline-none focus:border-gray-950 transition-all placeholder-gray-300"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button className="w-full py-4 mt-6 bg-gray-950 text-white rounded-lg font-bold text-lg hover:bg-black transition-all active:scale-[0.98]">
            회원가입 완료
          </button>
        </form>

        {/* 하단 부가기능 */}
        <div className="mt-8 flex justify-center items-center text-sm">
          <p className="text-gray-400 font-medium">이미 계정이 있으신가요?</p>
          <Link
            to="/login"
            className="ml-3 text-black hover:underline font-bold transition-all"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
