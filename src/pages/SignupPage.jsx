import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignUp";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaCheckCircle,
  FaRulerVertical,
  FaWeightHanging,
} from "react-icons/fa";

export default function SignupPage() {
  const navigate = useNavigate();
  const { registerUser, isLoading } = useSignup();

  // 단계 관리 (1: 계정 정보, 2: 신체 정보)
  const [step, setStep] = useState(1);

  // 통합 폼 상태
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    height: "",
    weight: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1단계 -> 2단계 이동 시 유효성 검사
  const handleNext = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("모든 계정 정보를 입력해 주세요.");
      return;
    }

    if (formData.password.length < 8) {
      alert("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
      return;
    }
    setStep(2);
  };

  // 최종 회원가입 핸들러
  const handleSignup = () => {
    if (!formData.height || !formData.weight) {
      alert("정확한 분석을 위해 신장과 몸무게를 모두 입력해 주세요.");
      return;
    }

    if (formData.height <= 0 || formData.weight <= 0) {
      alert("올바른 신체 수치를 입력해 주세요.");
      return;
    }

    // 훅 실행
    registerUser(formData, () => {
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/login");
    });
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-white px-6 font-sans antialiased py-12">
      <div className="w-full max-w-md border-2 border-black p-10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
        {/* 타이틀 및 단계 인디케이터 */}
        <div className="text-left mb-12 border-l-4 border-black pl-4 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-black tracking-normal">
              {step === 1 ? "01. 계정 정보 생성" : "02. 신체 정보 작성"}
            </p>
          </div>
          <div className="text-sm font-black text-black">
            0{step} <span className="text-gray-200">/ 02</span>
          </div>
        </div>

        {step === 1 ? (
          /* --- Phase 01: 계정 정보 입력 --- */
          <form
            onSubmit={handleNext}
            className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500"
          >
            <div className="relative group text-left">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
                <FaUser size={14} />
              </div>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="닉네임 (이름)"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
              />
            </div>

            <div className="relative group text-left">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
                <FaEnvelope size={14} />
              </div>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
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
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
              />
            </div>

            <div className="relative group text-left">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
                <FaCheckCircle size={14} />
              </div>
              <input
                required
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호 재입력"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-6 bg-black text-white font-black text-base uppercase hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:scale-95 duration-200"
            >
              Next Step
            </button>
          </form>
        ) : (
          /* --- Phase 02: 신체 정보 입력 --- */
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* 성별 선택 */}
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-black text-gray-400 ml-1 uppercase tracking-widest">
                Gender Selection
              </label>
              <div className="flex border-2 border-black overflow-hidden">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: g })}
                    className={`flex-1 py-4 text-xs font-black uppercase transition-all ${
                      formData.gender === g
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* 키 입력 */}
            <div className="relative group text-left">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
                <FaRulerVertical size={14} />
              </div>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="신장 (cm)"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
              />
            </div>

            {/* 몸무게 입력 */}
            <div className="relative group text-left">
              <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-black transition-colors">
                <FaWeightHanging size={14} />
              </div>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="몸무게 (kg)"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 outline-none focus:border-black transition-all placeholder-gray-300 text-sm font-bold"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-4 border-2 border-black text-black font-black text-sm uppercase hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleSignup}
                className="flex-2 py-4 bg-black text-white font-black text-sm uppercase hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] disabled:bg-gray-400"
              >
                {isLoading ? "Signing Up..." : "Complete"}
              </button>
            </div>
          </div>
        )}

        {/* 하단 로그인 링크 */}
        <div className="mt-10 flex justify-center items-center text-[11px] font-black uppercase tracking-widest">
          <p className="text-gray-400">이미 계정이 있으신가요?</p>
          <Link
            to="/login"
            className="ml-4 text-black border-b-2 border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all"
          >
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
}
