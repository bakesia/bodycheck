import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import {
  FaLaptopCode,
  FaMagic,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function AboutPage() {
  const navigate = useNavigate();
  // 스크롤 감지를 위한 Ref와 State
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    // 현재의 ref 값을 변수에 복사해둔다 (중요!)
    const currentHeroRef = heroRef.current;

    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }

    return () => {
      // cleanup 시점에 직접 ref.current를 쓰지 않고 복사해둔 변수를 쓴다
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  // 분석하러 가기 버튼 클릭 핸들러
  const handleAnalysisClick = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      // 로그인 상태
      navigate("/analysis");
    } else {
      // 비로그인 상태
      alert(
        `체형 분석 서비스는 로그인이 필요합니다.\n로그인 페이지로 이동합니다.`,
      );
      navigate("/login");
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black antialiased overflow-x-hidden">
      {/* 서비스 한줄 소개 */}
      <section
        ref={heroRef}
        className="py-32 px-8 max-w-6xl mx-auto text-left border-b-8 border-black"
      >
        {/* isVisible일 때만 애니메이션 클래스 주입, 아니면 투명하게 초기화 */}
        <div className={isVisible ? "animate-slide-left" : "opacity-0"}>
          <span className="bg-black text-white px-3 py-1 font-black tracking-[0.2em] text-[12px] uppercase mb-8 inline-block">
            Style recommendations With AI
          </span>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-12 uppercase">
            YOUR BODY, <br />
            <span className="text-gray-200">OUR LOGIC.</span>
          </h1>
          <p className="text-xl md:text-xl text-black max-w-3xl font-bold leading-tight uppercase tracking-tight">
            BODYCHECK.AI는 단순한 추천을 넘어 사용자의 신체 데이터를 수치화하고,
            <br />
            AI 알고리즘을 통해 최적의 퍼스널 핏을 도출하는 기술 중심 룩북
            서비스입니다.
          </p>
        </div>
      </section>

      {/* 기술 스택 설명 (호버 시 흑백 반전) */}
      <section className="py-24 px-8 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black">
            {/* SMPL 설명 카드 */}
            <div className="group p-12 bg-white border-b-4 md:border-b-0 md:border-r-4 border-black transition-all duration-500 hover:bg-black cursor-default">
              <div className="mb-10 text-black group-hover:text-white transition-colors duration-500">
                <FaLaptopCode size={40} />
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic text-black group-hover:text-white transition-colors duration-500">
                01. SMPL Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed font-bold text-sm uppercase group-hover:text-white/80 transition-colors duration-500">
                전신 사진에서 추출된 관절 데이터와 실루엣을 SMPL(Skinned
                Multi-Person Linear) 모델로 정밀 수치화합니다. 골격과 비율을
                분석하여 체형의 장점을 극대화하는 알고리즘을 가동합니다.
              </p>
            </div>

            {/* CLIP 설명 카드 */}
            <div className="group p-12 bg-white transition-all duration-500 hover:bg-black cursor-default">
              <div className="mb-10 text-black group-hover:text-white transition-colors duration-500">
                <FaMagic size={40} />
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic text-black group-hover:text-white transition-colors duration-500">
                02. CLIP Matching
              </h3>
              <p className="text-gray-600 leading-relaxed font-bold text-sm uppercase group-hover:text-white/80 transition-colors duration-500">
                텍스트와 이미지의 상관관계를 학습한 CLIP 모델을 통해 유저의
                추상적인 키워드를 시각적 스타일링으로 치환합니다. 단순 매칭을
                넘어 무드에 맞는 최적의 의류 조합을 제안합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 분석 모드 안내 */}
      <section className="py-32 px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
            Operation <br /> Modes
          </h2>
          <div className="h-1 flex-1 bg-black mb-2 hidden md:block mx-8"></div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
            Select your protocol
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* 모드 1 */}
          <div className="group border-t-2 border-black pt-8 flex flex-col md:flex-row gap-8">
            <span className="text-8xl font-black text-gray-100 group-hover:text-black transition-colors duration-500">
              M1
            </span>
            <div className="flex-1">
              <h4 className="text-2xl font-black mb-4 flex items-center gap-4 uppercase italic">
                Mode1. Mood Recommendation
                <FaCheckCircle size={20} className="text-black" />
              </h4>
              <p className="text-gray-500 font-bold text-lg leading-snug">
                데이터베이스의 방대한 룩북 중 유저의 체형과 선택한 태그를
                기반으로 가장 적합한 스타일을 추출합니다. 당신을 위한 새로운
                퍼스널 패션이 즉시 생성됩니다.
              </p>
            </div>
          </div>

          {/* 모드 2 */}
          <div className="group border-t-2 border-black pt-8 flex flex-col md:flex-row gap-8">
            <span className="text-8xl font-black text-gray-100 group-hover:text-black transition-colors duration-500">
              M2
            </span>
            <div className="flex-1">
              <h4 className="text-2xl font-black mb-4 flex items-center gap-4 uppercase italic">
                Mode2. Closet Mix-Match
                <FaCheckCircle size={20} className="text-black" />
              </h4>
              <p className="text-gray-500 font-bold text-lg leading-snug">
                보유한 의류 사진을 분석하여 유저의 실제 신체에 가장 최적화된
                조합을 계산합니다. 옷장 속 아이템들의 잠재력을 기술적으로
                끌어냅니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 분석 시작 버튼 */}
      <section className="bg-black text-white py-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase italic leading-tight">
            Ready to <br /> Check your body?
          </h2>
          <button
            onClick={handleAnalysisClick}
            className="inline-flex items-center gap-6 bg-white text-black px-12 py-6 border-4 border-white hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer"
          >
            <span className="text-2xl font-black uppercase tracking-widest">
              분석하러 가기
            </span>
            <FaArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform duration-300"
            />
          </button>
        </div>
      </section>

      {/* 커스텀 애니메이션 정의 */}
      <style>{`
        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-left {
          animation: slide-left 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
