import { useState } from "react";
import {
  getProfileMetadataApi,
  updateProfileApi,
  updatePasswordApi,
} from "../api/profileApi";
import useUserStore from "../store/useUserStore";

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const { user, updateUser } = useUserStore();

  // 메타데이터 요청
  const fetchMetadata = async () => {
    if (!user.id) return;
    setIsLoading(true);
    try {
      const data = await getProfileMetadataApi(user.id);
      setMetadata(data);
    } catch (error) {
      console.error("프로필 메타 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 프로필 정보 수정 요청
  const handleUpdateProfile = async (editForm, onSuccess) => {
    try {
      const payload = {
        name: editForm.name,
        gender: editForm.gender,
        height: Number(editForm.height),
        weight: Number(editForm.weight),
      };
      const data = await updateProfileApi(payload);
      updateUser(data.user); // Zustand 전역 스토어 즉시 동기화
      alert("정보가 성공적으로 업데이트되었습니다.");
      onSuccess();
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert(error.response?.data?.message || "업데이트에 실패했습니다.");
    }
  };

  // 비밀번호 변경 요청
  const handleUpdatePassword = async (editForm, onSuccess) => {
    try {
      const payload = {
        currentPassword: editForm.currentPassword,
        newPassword: editForm.newPassword,
      };
      await updatePasswordApi(payload);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      onSuccess();
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert(error.response?.data?.message || "비밀번호 변경 실패");
    }
  };

  return {
    metadata,
    isLoading,
    fetchMetadata,
    handleUpdateProfile,
    handleUpdatePassword,
  };
}
