import React, { useState } from "react";
import useAnalysisStore from "../../store/useAnalysisStore";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";
import { PiTShirt, PiPants } from "react-icons/pi";
import COLOR_DATA from "../../data/colors.json";

export default function Step2Config() {
  const { uploadedImage, mode, setStep, setSelectedTags } = useAnalysisStore();

  const [selections, setSelections] = useState({
    weather: "",
    target: "",
    color: "",
    style: "",
    tpo: "",
  });

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
      return alert("모든 옵션을 선택해 주세요.");
    if (mode === "mode2" && !isMode2Valid)
      return alert("모든 옵션을 선택해 주세요.");

    const finalTags =
      mode === "mode1"
        ? [selections.weather, selections.color, selections.style]
        : [selections.weather, selections.target, selections.tpo];

    setSelectedTags(finalTags);
    setStep(3);
  };

  return (
    <div className="space-y-12 font-sans antialiased pb-20">
      {/* 제목 파트 */}
      <div className="text-left border-l-4 border-black pl-4">
        <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
          Preference Setup
        </h2>
        <p className="text-sm text-gray-500 mt-1 font-medium leading-relaxed">
          {mode === "mode1"
            ? "AI 신체 분석 데이터와 결합할 사용자의 스타일 취향을 설정합니다."
            : "보유하신 아이템을 분석하여 최적의 믹스매치 조합을 제안합니다."}
          <br />
          필수 옵션을 선택하여 분석을 완성해 주세요.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* 왼쪽: 사진 섹션 */}
        <div className="flex-1 space-y-4">
          <div className="border-2 border-black bg-gray-50 h-162.5 overflow-hidden">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 font-black">
                NO IMAGE
              </div>
            )}
          </div>
          <p className="text-[10px] font-black text-black uppercase tracking-widest italic">
            * Input Source
          </p>
        </div>

        {/* 오른쪽: 설정 섹션 */}
        <div className="flex-1 flex flex-col space-y-10">
          {/* [공통] 날씨 선택 */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
              Weather
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {weatherOptions.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSelect("weather", item.name)}
                  className={`flex items-center justify-center gap-2 py-4 border-2 text-[11px] font-black uppercase transition-all ${
                    selections.weather === item.name
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
                  }`}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* [분기] 모드 1: 컬러 / 모드 2: 분석 대상 */}
          {mode === "mode1" ? (
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Primary Color
              </h3>
              <div className="border border-black h-48 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                  {COLOR_DATA.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleSelect("color", color.name)}
                      className={`flex items-center gap-3 p-2 border transition-all ${
                        selections.color === color.name
                          ? "border-black bg-gray-50"
                          : "border-transparent hover:border-gray-500"
                      }`}
                    >
                      <div
                        className="w-5 h-5 border border-gray-100 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span
                        className={`text-[10px] font-bold uppercase ${selections.color === color.name ? "text-black" : "text-gray-400"}`}
                      >
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Analyze Target
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {targetOptions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelect("target", item.name)}
                    className={`flex items-center justify-center gap-3 py-4 border-2 text-[11px] font-black uppercase transition-all ${
                      selections.target === item.name
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
                    }`}
                  >
                    {item.icon} {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* [분기] 모드 1: 스타일 / 모드 2: TPO */}
          {mode === "mode1" ? (
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Style Mood
              </h3>
              <div className="grid grid-cols-2 gap-2">
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
                    className={`py-4 border-2 text-[11px] font-black uppercase transition-all ${
                      selections.style === style
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Occasion (TPO)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["Daily", "Office", "Date", "Formal", "Outdoor", "Party"].map(
                  (tpo) => (
                    <button
                      key={tpo}
                      onClick={() => handleSelect("tpo", tpo)}
                      className={`py-4 border-2 text-[11px] font-black uppercase transition-all ${
                        selections.tpo === tpo
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
                      }`}
                    >
                      {tpo}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 최종 분석 시작 버튼 */}
      <div className="pt-10 flex flex-col items-center">
        <button
          onClick={handleStartAnalysis}
          className="w-[50%] py-6 text-[11px] font-black uppercase tracking-[0.5em] border-2 border-black bg-white text-black transition-all duration-300 hover:bg-black hover:text-white"
        >
          Analysis Start
        </button>
      </div>
    </div>
  );
}
