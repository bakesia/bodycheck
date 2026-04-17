import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaMagic,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa"; // react-icons 사용

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-black">
      {/*서비스 한줄 소개*/}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center border-b border-gray-200">
        <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
          Styling recommendations just for you
        </span>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter mb-10">
          YOUR BODY,
          <br />
          <span className="text-gray-400">YOUR STYLE.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
          BODYCHECK.AI는 단순한 패션 추천을 넘어, 사용자의 고유한 체형 데이터를
          기반으로 인공지능이 가장 최적화된 스타일을 매칭시켜주는 차세대 룩북
          서비스입니다.
        </p>
      </section>

      {/* 기술 스택 설명 (변경 요망) */}
      <section className="py-24 px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* SMPL 설명 */}
            <div className="flex-1 p-10 border border-gray-200 rounded-3xl">
              <div className="mb-8 text-black">
                <FaLaptopCode size={32} />
              </div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                SMPL Body Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                전신 사진에서 추출된 관절 데이터와 실루엣을 SMPL(Skinned
                Multi-Person Linear) 모델로 수치화합니다. 이를 통해 체형별
                단점을 보완하고 장점을 극대화하는 패션을 사용자에게 제공합니다.
              </p>
            </div>

            {/* CLIP 설명 */}
            <div className="flex-1 p-10 border border-gray-200 rounded-3xl bg-gray-100/30">
              <div className="mb-8 text-black">
                <FaMagic size={32} />
              </div>
              <h3 className="text-2xl font-black mb-6 tracking-tight">
                CLIP Mood Matching
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                텍스트와 이미지의 상관관계를 학습한 CLIP 모델을 활용하여,
                사용자가 입력한 키워드에 가장 부합하는 의류 데이터와 스타일링을
                정밀하게 매칭합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 분석 모드 안내 */}
      <section className="py-24 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight mb-4">
            TWO ANALYSIS MODES
          </h2>
          <div className="w-12 h-1 bg-black mx-auto"></div>
        </div>

        <div className="space-y-16">
          {/* 모드 1 */}
          <div className="flex items-start gap-8">
            <span className="text-6xl font-black text-gray-200 leading-none">
              01
            </span>
            <div>
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                Mood Recommendation{" "}
                <FaCheckCircle size={18} className="text-gray-200" />
              </h4>
              <p className="text-gray-600 font-medium">
                업로드한 전신 사진에 원하는 무드(스타일, 컬러 등)를 선택해
                보세요. AI가 당신의 체형을 고려한 새로운 룩북을 생성해 줍니다.
              </p>
            </div>
          </div>

          {/* 모드 2 */}
          <div className="flex items-start gap-8">
            <span className="text-6xl font-black text-gray-200 leading-none">
              02
            </span>
            <div>
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                Closet Mix-Match{" "}
                <FaCheckCircle size={18} className="text-gray-200" />
              </h4>
              <p className="text-gray-600 font-medium">
                자신이 소유한 의류 사진을 업로드하면, AI가 당신의 신체 사이즈와
                비율에 맞춰 기존 옷들을 어떻게 매칭해야할지 분석하여 최적의
                결과를 추천해 줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 분석 시작 버튼 */}
      <section className="py-20 bg-gray-950 text-white text-center">
        <h2 className="text-3xl font-black mb-8 tracking-tighter">
          준비되셨나요? 당신의 스타일을 체크하세요.
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-all group"
        >
          START ANALYSIS
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
}
