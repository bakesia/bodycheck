import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa";
import useAnalysisStore from "../store/useAnalysisStore";

export default function Step1Upload() {
  const { mode, setMode, setUploadedImage, setStep } = useAnalysisStore();

  // 모드별 설명 데이터
  const modeInfo = {
    mode1: {
      title: "Mood Recommendation",
      desc: "사용자의 전신 사진, 그리고 현재의 날씨, 색상 등 원하는 태그를 조합하여 사용자에게 맞는 최적의 스타일을 추천합니다.",
    },
    mode2: {
      title: "Closet Mix-Match",
      desc: "나의 옷장에 있는 의상을 기반으로 하여 해당 의상에 가장 알맞는 조합을 제안합니다.",
    },
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result);
          setStep(2);
        };
        reader.readAsDataURL(file);
      }
    },
    [setUploadedImage, setStep],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="space-y-10 font-sans antialiased">
      {/* 제목 파트 */}
      <div className="text-left border-l-4 border-black pl-4">
        <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
          Analysis Setup
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          모드를 선택하고 사진을 업로드해 주세요.
        </p>
      </div>

      {/* 모드 선택 토글 (슬라이딩 애니메이션 추가) */}
      <div className="space-y-4">
        <div className="relative flex w-full border-2 border-black overflow-hidden h-14 bg-white">
          {/* 슬라이딩 배경 박스 */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-black transition-transform duration-300 ease-in-out ${
              mode === "mode2" ? "translate-x-full" : "translate-x-0"
            }`}
          />

          <button
            onClick={() => setMode("mode1")}
            className={`relative z-10 flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors duration-300 ${
              mode === "mode1" ? "text-white" : "text-gray-400 hover:text-black"
            }`}
          >
            Mode 01. Mood
          </button>
          <button
            onClick={() => setMode("mode2")}
            className={`relative z-10 flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors duration-300 ${
              mode === "mode2" ? "text-white" : "text-gray-400 hover:text-black"
            }`}
          >
            Mode 02. Closet
          </button>
        </div>

        {/* 모드별 설명 */}
        <div className="px-1">
          <p className="text-[11px] font-black text-black uppercase tracking-wider">
            {modeInfo[mode].title}
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {modeInfo[mode].desc}
          </p>
        </div>
      </div>

      {/* 업로드존 */}
      <div className="flex justify-center w-full">
        <div
          {...getRootProps()}
          className={`relative border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 aspect-6/4 w-full max-w-xl border-black group`}
        >
          <input {...getInputProps()} />

          <FaCamera
            size={36}
            className="text-gray-400 mb-5 transition-colors duration-300 group-hover:text-black"
          />

          <div className="text-center px-6">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest transition-colors duration-300 group-hover:text-black">
              Click or Drag photo here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
