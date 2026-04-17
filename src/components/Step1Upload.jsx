import React, { useState } from "react";

const Step1Upload = ({ onNext, data, setData }) => {
  // 로컬 미리보기 상태 (화면에 바로 보여주기 위함)
  const [preview, setPreview] = useState(
    data.image ? URL.createObjectURL(data.image) : null,
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      // 부모의 데이터 상태 업데이트 (사진 저장)
      setData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleModeChange = (mode) => {
    // 부모의 데이터 상태 업데이트 (모드 저장)
    setData((prev) => ({ ...prev, mode: mode }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <main className="grow flex flex-col items-center justify-center p-6 py-20">
        <label className="relative group cursor-pointer block w-full max-w-2xl mb-8">
          <div
            className={`aspect-16/10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all 
            ${preview ? "border-gray-900" : "border-gray-300 hover:border-gray-400 bg-gray-50"}`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Upload Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <span className="mt-4 text-xl font-semibold text-gray-800">
                  사진 업로드
                </span>
                <span className="absolute bottom-3 right-4 text-xs text-gray-300">
                  532 X 327
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>

        <p className="text-sm text-gray-500 mb-12">
          Drag & Drop or Click to Begin
        </p>

        <div className="w-full max-w-md space-y-8">
          <div className="bg-gray-100 p-1 rounded-full flex items-center relative h-14">
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-out
              ${data.mode === 2 ? "translate-x-[calc(100%+8px)]" : "translate-x-0"}`}
            ></div>
            <button
              onClick={() => handleModeChange(1)}
              className={`flex-1 flex items-center justify-center space-x-2.5 z-10 font-semibold text-sm transition-colors ${data.mode === 1 ? "text-gray-950" : "text-gray-500"}`}
            >
              <span>모드 1: 무드 추천</span>
            </button>
            <button
              onClick={() => handleModeChange(2)}
              className={`flex-1 flex items-center justify-center space-x-2.5 z-10 font-semibold text-sm transition-colors ${data.mode === 2 ? "text-gray-950" : "text-gray-500"}`}
            >
              <span>모드 2: 내 옷 활용</span>
            </button>
          </div>

          <button
            onClick={onNext} // 버튼 클릭 시 다음 단계로!
            disabled={!data.image} // 사진 없으면 클릭 안 됨
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg 
            ${data.image ? "bg-gray-950 text-white hover:bg-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            분석 시작하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Step1Upload;
