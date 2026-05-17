import { useState } from "react";
import { findPwApi } from "../api/authApi";

export function useFindPw() {
  const [isSearching, setIsSearching] = useState(false);
  const [foundPw, setFoundPw] = useState("");

  const handleFindPwSubmit = async (email) => {
    setIsSearching(true);
    try {
      console.log("비밀번호 찾기 요청 발송");
      const data = await findPwApi(email);
      const realPw = data.password; // 서버가 뱉은 원래 비밀번호

      // 마스킹 로직
      const len = realPw.length;
      const visible = Math.max(1, Math.floor(len / 4));
      const maskCount = len - visible * 2;

      const masked =
        realPw.slice(0, visible) +
        "*".repeat(maskCount) +
        realPw.slice(-visible);

      setFoundPw(masked);
    } catch (error) {
      console.error("비밀번호 찾기 에러:", error);
      const errorMsg =
        error.response?.data?.message || "존재하지 않는 회원 정보입니다.";
      alert(errorMsg);
    } finally {
      setIsSearching(false);
    }
  };

  const resetFoundPw = () => setFoundPw("");

  return { handleFindPwSubmit, isSearching, foundPw, resetFoundPw };
}
