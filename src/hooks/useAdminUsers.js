// src/hooks/useAdminUsers.js
import { useState, useCallback } from "react";
import { fetchAdminUsersApi, deleteAdminUserApi } from "../api/adminApi";

export default function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminUsersApi();
      setUsers(data);
    } catch (err) {
      console.error("어드민 유저 목록 조회 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeUser = useCallback(async (userId) => {
    try {
      await deleteAdminUserApi(userId);
      // 성공 시 화면에서 즉시 필터링
      setUsers((prev) => prev.filter((u) => (u.userId ?? u.id) !== userId));
    } catch (err) {
      console.error("어드민 유저 삭제 실패:", err);
      alert(err.response?.data?.detail || "유저 삭제 처리에 실패했습니다.");
    }
  }, []);

  return { users, isLoading, loadUsers, removeUser };
}
