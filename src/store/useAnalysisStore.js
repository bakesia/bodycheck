import { create } from "zustand";

const useAnalysisStore = create((set) => ({
  step: 1,
  uploadedImage: null,
  mode: "mode1",
  selectedTags: [],
  isLoading: false,

  setStep: (step) => set({ step }),
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setMode: (mode) => set({ mode, selectedTags: [] }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setIsLoading: (loading) => set({ isLoading: loading }),

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
