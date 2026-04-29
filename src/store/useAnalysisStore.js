import { create } from "zustand";

const useAnalysisStore = create((set) => ({
  step: 1,
  uploadedImage: null,
  mode: "mode1", // mode1: 무드(태그 기반) 추천, mode2: 클로젯 믹스매치(유저 의상 사진 기반)
  selectedTags: [],
  isLoading: false, // 로딩 상태 추가

  setStep: (step) => set({ step }),
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setMode: (mode) => set({ mode, selectedTags: [] }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  // 모든 데이터 초기화 (분석 다시하기용)
  reset: () =>
    set({
      step: 1,
      uploadedImage: null,
      mode: "mode1",
      selectedTags: [],
      isLoading: false,
    }),
}));

export default useAnalysisStore;
