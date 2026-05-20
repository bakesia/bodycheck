import { create } from "zustand";

const useAnalysisStore = create((set) => ({
  step: 1,
  images: { user: null, item: null },
  mode: "mode1",
  selectedTags: [],
  customRequest: "", // 추가 요청 사항 필드
  isLoading: false, // 분석 중 로딩 상태
  analysisResult: null,
  fittedImage: null, // 합성 결과 이미지 URL
  isSyncLoading: false, // 합성 중 로딩 상태

  setStep: (step) => set({ step }),
  setImage: (type, file) =>
    set((state) => ({ images: { ...state.images, [type]: file } })),
  removeImage: (type) =>
    set((state) => ({ images: { ...state.images, [type]: null } })),
  setMode: (mode) =>
    set({
      mode,
      selectedTags: [],
      images: { user: null, item: null },
      customRequest: "",
      step: 1,
    }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setCustomRequest: (text) => set({ customRequest: text }), // 추가
  setIsLoading: (loading) => set({ isLoading: loading }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setFittedImage: (url) => set({ fittedImage: url }),
  setSyncLoading: (status) => set({ isSyncLoading: status }),

  reset: () =>
    set({
      step: 1,
      images: { user: null, item: null },
      mode: "mode1",
      selectedTags: [],
      customRequest: "",
      analysisResult: null,
      fittedImage: null,
      isSyncLoading: false,
    }),
}));

export default useAnalysisStore;
