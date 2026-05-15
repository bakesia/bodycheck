import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";
import { PiTShirt, PiPants } from "react-icons/pi";
import useAnalysisStore from "../../store/useAnalysisStore";
import useUserStore from "../../store/useUserStore";
import COLOR_DATA from "../../data/colors.json";

export default function Step2Config() {
  const {
    images,
    mode,
    setStep,
    setSelectedTags,
    setCustomRequest,
    customRequest,
  } = useAnalysisStore();
  const { user } = useUserStore();

  const [selections, setSelections] = useState({
    weather: "",
    target: "",
    color: "",
    style: "",
    tpo: "",
  });

  // 모드 2용 이미지 슬라이드 상태
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const displayImages = [images.user, images.item].filter(Boolean);

  const weatherOptions = [
    { name: "Sunny", icon: <WiDaySunny size={20} /> },
    { name: "Cloudy", icon: <WiCloudy size={20} /> },
    { name: "Rainy", icon: <WiRain size={20} /> },
    { name: "Snowy", icon: <WiSnow size={20} /> },
  ];

  const targetOptions = [
    { name: "Top", icon: <PiTShirt size={22} /> },
    { name: "Bottom", icon: <PiPants size={22} /> },
  ];

  const handleSelect = (category, value) => {
    setSelections((prev) => ({ ...prev, [category]: value }));
  };

  const handleStartAnalysis = () => {
    // 1. 유효성 검사
    const isMode1Valid =
      mode === "mode1" &&
      selections.weather &&
      selections.color &&
      selections.style;
    const isMode2Valid =
      mode === "mode2" &&
      selections.weather &&
      selections.target &&
      selections.tpo;

    if (mode === "mode1" && !isMode1Valid)
      return alert("필수 옵션을 모두 선택해 주세요.");
    if (mode === "mode2" && !isMode2Valid)
      return alert("필수 옵션을 모두 선택해 주세요.");

    // 2. 태그 확정
    const finalTags =
      mode === "mode1"
        ? [selections.weather, selections.color, selections.style]
        : [selections.weather, selections.target, selections.tpo];

    // 3. FormData 전송 전 데이터 최종 확인 (콘솔)
    const analysisPayload = {
      userContext: {
        id: user.id,
        gender: user.gender,
        height: user.height,
      },
      analysisSetup: {
        mode: mode,
        tags: finalTags,
        customRequest: customRequest,
      },
      sourceImages: {
        userImage: images.user ? `FILE_OBJECT: ${images.user.name}` : "EMPTY",
        itemImage: images.item ? `FILE_OBJECT: ${images.item.name}` : "EMPTY",
      },
    };

    console.log("🚀 [SYSTEM] 분석 프로토콜 가동 - FormData 패키징 준비");
    console.log("유저 컨텍스트:", analysisPayload.userContext);
    console.log("분석 설정값:", analysisPayload.analysisSetup);
    console.log("이미지 파일 상태:", analysisPayload.sourceImages);

    setSelectedTags(finalTags);
    setStep(3);
  };

  return (
    <div className="space-y-12 font-sans antialiased pb-20 text-left">
      <div className="border-l-8 border-black pl-5">
        <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
          Preference Setup
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-bold leading-relaxed">
          {mode === "mode1"
            ? "사용자 체형 사진과 선택한 키워드들을 결합하여 최적의 스타일을 분석합니다."
            : "보유하신 아이템과 현재 체형을 매칭하여 최적의 조합을 분석합니다."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* 왼쪽: 이미지 프리뷰 (File 객체 대응) */}
        <div className="flex-1 space-y-4">
          <div className="relative border-4 border-black bg-gray-50 aspect-3/4 overflow-hidden">
            {displayImages[currentImgIdx] ? (
              <img
                // [수정] File 객체면 URL로 변환해서 보여줌
                src={
                  displayImages[currentImgIdx] instanceof File
                    ? URL.createObjectURL(displayImages[currentImgIdx])
                    : displayImages[currentImgIdx]
                }
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-black">
                NO IMAGE
              </div>
            )}

            {mode === "mode2" && displayImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImgIdx(0)}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white transition-opacity ${currentImgIdx === 0 ? "opacity-20" : "opacity-100"}`}
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImgIdx(1)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white transition-opacity ${currentImgIdx === 1 ? "opacity-20" : "opacity-100"}`}
                >
                  <FaChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <div
                    className={`w-2 h-2 border border-white ${currentImgIdx === 0 ? "bg-white" : "bg-transparent"}`}
                  />
                  <div
                    className={`w-2 h-2 border border-white ${currentImgIdx === 1 ? "bg-white" : "bg-transparent"}`}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-black text-black uppercase tracking-widest">
              * Input Source:{" "}
              {mode === "mode2"
                ? currentImgIdx === 0
                  ? "사용자 전신사진"
                  : "의류 사진"
                : "사용자 전신사진"}
            </p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {user.gender} / {user.height}cm
            </p>
          </div>
        </div>

        {/* 오른쪽: 설정 옵션들 (이전과 동일) */}
        <div className="flex-1 flex flex-col space-y-8">
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-widest text-black">
              01. 날씨
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {weatherOptions.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSelect("weather", item.name)}
                  className={`flex items-center justify-center gap-2 py-4 border-2 text-[11px] font-black uppercase transition-all ${
                    selections.weather === item.name
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-400 border-gray-100 hover:border-black"
                  }`}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          </div>

          {mode === "mode1" ? (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-black">
                  02. 주 색상
                </h3>
                <div className="border-2 border-black h-40 overflow-y-auto p-4 bg-white">
                  <div className="grid grid-cols-2 gap-2">
                    {COLOR_DATA.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleSelect("color", color.name)}
                        className={`flex items-center gap-3 p-2 border-2 transition-all ${selections.color === color.name ? "border-black bg-gray-200" : "border-transparent"}`}
                      >
                        <div
                          className="w-4 h-4 border border-black"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] font-black uppercase">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-black">
                  03. 스타일
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Street",
                    "Chic",
                    "Casual",
                    "City Boy",
                    "Workwear",
                    "Vintage",
                  ].map((style) => (
                    <button
                      key={style}
                      onClick={() => handleSelect("style", style)}
                      className={`py-3 border-2 text-sm font-black uppercase transition-all ${selections.style === style ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-black"}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-black">
                  02. 분석 대상
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {targetOptions.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleSelect("target", item.name)}
                      className={`flex items-center justify-center gap-3 py-4 border-2 text-[11px] font-black uppercase transition-all ${selections.target === item.name ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-black"}`}
                    >
                      {item.icon} {item.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-black">
                  03. 상황 (TPO)
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Daily",
                    "Office",
                    "Date",
                    "Formal",
                    "Outdoor",
                    "Party",
                  ].map((tpo) => (
                    <button
                      key={tpo}
                      onClick={() => handleSelect("tpo", tpo)}
                      className={`py-3 border-2 text-sm font-black uppercase transition-all ${selections.tpo === tpo ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-black"}`}
                    >
                      {tpo}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 하단 입력창 */}
      <div className="pt-8 border-t-4 border-black space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-black">
          04. 추가 요청 사항 (Optional)
        </h3>
        <textarea
          value={customRequest}
          onChange={(e) => setCustomRequest(e.target.value)}
          placeholder="예: 반바지와 비 오는 날 입을 수 있는 스타일로 추천해줘."
          className="w-full h-32 p-6 border-4 border-black outline-none font-bold text-sm bg-white focus:bg-white transition-colors resize-none"
        />
        <p className="text-[11px] text-gray-400 font-bold">
          * 입력하신 문장은 AI 분석 시 우선적으로 반영됩니다.
        </p>
      </div>

      <div className="pt-10 flex justify-center">
        <button
          onClick={handleStartAnalysis}
          className="w-full md:w-2/3 py-6 text-sm font-black uppercase tracking-[0.5em] border-4 border-black bg-black text-white transition-all hover:bg-white hover:text-black active:translate-x-1 active:translate-y-1"
        >
          Analysis Start
        </button>
      </div>
    </div>
  );
}
