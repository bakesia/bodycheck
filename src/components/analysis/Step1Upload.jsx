import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCamera, FaUserCircle, FaTshirt, FaTimes } from "react-icons/fa";
import useAnalysisStore from "../../store/useAnalysisStore";

export default function Step1Upload() {
  const { mode, setMode, images, setImage, removeImage, setStep } =
    useAnalysisStore();

  const modeInfo = {
    mode1: {
      title: "Mode 01. Mood",
      desc: "사용자의 전신 사진과 현재 날씨, 색상 등 태그를 조합하여 현재 사용자 체형에 적합한 최적의 스타일을 추천합니다.",
    },
    mode2: {
      title: "Mode 02. Closet",
      desc: "내 옷장에 있는 의상 사진을 기반으로, 현재 체형에 가장 알맞은 매칭 조합을 제안합니다.",
    },
  };

  // 모드 1: 사진 드롭 시 바로 저장하고 다음 단계로
  const onDropMode1 = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // 원본 File 객체를 스토어에 바로 저장
        setImage("user", file);
        setStep(2);
      }
    },
    [setImage, setStep],
  );

  // 모드 2: 타입별(user/item) 드롭 핸들러
  const createDropHandler = (type) => (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // [수정] 원본 File 객체 저장 (FormData용)
      setImage(type, file);
    }
  };

  const dropzoneMode1 = useDropzone({
    onDrop: onDropMode1,
    accept: { "image/*": [] },
    multiple: false,
  });
  const dropzoneUser = useDropzone({
    onDrop: createDropHandler("user"),
    accept: { "image/*": [] },
    multiple: false,
  });
  const dropzoneItem = useDropzone({
    onDrop: createDropHandler("item"),
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleStartAnalysis = () => {
    if (images.user && images.item) {
      setStep(2);
    } else {
      alert("전신 사진과 의류 사진을 모두 업로드해 주세요.");
    }
  };

  const renderUploadBox = (
    getRootProps,
    getInputProps,
    isDragActive,
    label,
    icon,
    warningText,
  ) => (
    <div className="flex flex-col gap-3 flex-1 min-w-70">
      <div
        {...getRootProps()}
        className={`relative border-4 border-black aspect-3/4 flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragActive ? "bg-gray-100" : "bg-white hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {icon}
        <p className="text-sm font-black text-black uppercase tracking-widest mt-6">
          {label} 업로드
        </p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">
          (클릭 또는 드래그)
        </p>
      </div>
      <p className="text-[11px] font-bold text-gray-500 bg-gray-50 p-3 border-l-4 border-gray-300 text-left leading-relaxed">
        ⚠ 주의: {warningText}
      </p>
    </div>
  );

  const renderPreviewBox = (type, label) => (
    <div className="flex flex-col gap-3 flex-1 min-w-70">
      <div className="relative border-4 border-black aspect-3/4 overflow-hidden bg-white">
        {/* File 객체인 경우 URL.createObjectURL을 써서 미리보기를 띄움 */}
        <img
          src={
            images[type] instanceof File
              ? URL.createObjectURL(images[type])
              : images[type]
          }
          alt={label}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => removeImage(type)}
          className="absolute top-2 right-2 bg-black text-white p-2 border-2 border-white hover:scale-110 transition-transform"
        >
          <FaTimes size={16} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white py-3 px-4 text-center">
          <p className="text-xs font-black uppercase tracking-widest">
            {label} 등록 완료
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-12 font-sans antialiased text-left mb-20">
      <div className="text-left border-l-8 border-black pl-5">
        <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
          Analysis Setup
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-bold">
          분석 모드를 선택하고 필요한 사진을 프로토콜에 맞게 등록해 주세요.
        </p>
      </div>

      <div className="space-y-5">
        <div className="relative flex w-full border-2 border-black overflow-hidden h-16 bg-white">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-black transition-transform duration-300 ease-in-out ${
              mode === "mode2" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setMode("mode1")}
            className={`relative z-10 flex-1 py-4 text-sm font-black uppercase tracking-widest transition-colors duration-300 ${
              mode === "mode1" ? "text-white" : "text-gray-400 hover:text-black"
            }`}
          >
            Mode 01. Mood
          </button>
          <button
            onClick={() => setMode("mode2")}
            className={`relative z-10 flex-1 py-4 text-sm font-black uppercase tracking-widest transition-colors duration-300 ${
              mode === "mode2" ? "text-white" : "text-gray-400 hover:text-black"
            }`}
          >
            Mode 02. Closet
          </button>
        </div>

        <div className="px-1 bg-gray-50 p-5 border-l-8 border-black">
          <p className="text-sm font-black pl-5 text-black uppercase tracking-widest">
            {modeInfo[mode].title}
          </p>
          <p className="text-xs text-gray-700 pl-5 mt-2 leading-relaxed font-bold">
            {modeInfo[mode].desc}
          </p>
        </div>
      </div>

      {mode === "mode1" && (
        <div className="flex justify-center w-full animate-in fade-in duration-500">
          <div className="w-full max-w-sm">
            {renderUploadBox(
              dropzoneMode1.getRootProps,
              dropzoneMode1.getInputProps,
              dropzoneMode1.isDragActive,
              "전신 사진",
              <FaCamera size={50} className="text-gray-300" />,
              "머리부터 발끝까지 정면으로 나온 전신사진을 등록해 주세요. 배경이 깔끔할수록 분석 정확도가 높습니다.",
            )}
          </div>
        </div>
      )}

      {mode === "mode2" && (
        <div className="space-y-12 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {images.user
              ? renderPreviewBox("user", "내 전신 사진")
              : renderUploadBox(
                  dropzoneUser.getRootProps,
                  dropzoneUser.getInputProps,
                  dropzoneUser.isDragActive,
                  "내 전신 사진",
                  <FaCamera size={50} className="text-gray-300" />,
                  "분석의 기준이 될 현재 체형의 전신 정면 사진을 등록해 주세요.",
                )}

            {images.item
              ? renderPreviewBox("item", "의류 아이템 사진")
              : renderUploadBox(
                  dropzoneItem.getRootProps,
                  dropzoneItem.getInputProps,
                  dropzoneItem.isDragActive,
                  "의류 아이템 사진",
                  <FaTshirt size={50} className="text-gray-300" />,
                  "바닥이나 평평한 곳에 의류를 펼쳐놓고 위에서 수직으로 찍은 사진을 등록해 주세요.",
                )}
          </div>

          {images.user && images.item && (
            <div className="text-center pt-8 border-t-4 border-black">
              <button
                onClick={handleStartAnalysis}
                className="px-20 py-6 bg-black text-white font-black text-base uppercase tracking-[0.4em] hover:bg-gray-800 transition-all active:translate-x-1 active:translate-y-1"
              >
                COMMIT & START ANALYSIS
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
