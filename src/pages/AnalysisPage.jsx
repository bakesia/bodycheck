import React, { useState } from "react";
import Step1Upload from "../components/Step1Upload";

// 임시 컴포넌트 (파일 따로 만들기 전까지 에러 방지용)
const Step2Config = ({ onPrev, onNext, data }) => (
  <div className="p-20 text-center">
    <h2 className="text-2xl mb-4">
      Step 2: {data.mode === 1 ? "무드" : "의류"} 설정 화면
    </h2>
    <button onClick={onPrev} className="mr-4 p-2 bg-gray-200">
      이전으로
    </button>
    <button onClick={onNext} className="p-2 bg-black text-white">
      결과 보기
    </button>
  </div>
);

const Step3Result = ({ data }) => (
  <div className="p-20 text-center">
    <h2 className="text-2xl">Step 3: 분석 결과 리포트</h2>
    <p>선택한 모드: {data.mode}</p>
  </div>
);

const AnalysisPage = () => {
  const [step, setStep] = useState(1);
  const [analysisData, setAnalysisData] = useState({
    image: null,
    mode: 1,
    tags: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="analysis-container">
      {step === 1 && (
        <Step1Upload
          onNext={nextStep}
          data={analysisData}
          setData={setAnalysisData}
        />
      )}
      {step === 2 && (
        <Step2Config onPrev={prevStep} onNext={nextStep} data={analysisData} />
      )}
      {step === 3 && <Step3Result data={analysisData} />}
    </div>
  );
};

export default AnalysisPage;
