import { useState } from "react";
import { signupApi } from "../api/authApi";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (formData, onSuccess) => {
    setIsLoading(true);
    try {
      console.log("회원가입 API 요청 발송");
      await signupApi(formData);

      // 성공하면 컴포넌트가 넘겨준 페이지 이동 로직 가동
      onSuccess();
    } catch (error) {
      console.error("❌ [HOOK] 회원가입 에러 발생:", error);
      const errorMsg =
        error.response?.data?.message ||
        "이미 존재하는 이메일이거나 서버 에러가 발생했습니다.";
      alert(`회원가입 실패: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading };
}
