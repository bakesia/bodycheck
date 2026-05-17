import { useState } from "react";
import { loginApi } from "../api/authApi";
import useUserStore from "../store/useUserStore"; // Zustand 스토어 불러오기

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUserStore();

  const handleLoginSubmit = async (email, password, onSuccess) => {
    setIsLoading(true);
    try {
      console.log("로그인 요청 발송");
      const data = await loginApi(email, password);

      // 스토어의 login 액션 가동 (유저 객체와 토큰 주입)
      login(data.user, data.accessToken);

      onSuccess();
    } catch (error) {
      console.error("로그인 에러:", error);
      const errorMsg =
        error.response?.data?.message ||
        "이메일 또는 비밀번호가 일치하지 않습니다.";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLoginSubmit, isLoading };
}
