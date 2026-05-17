import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/useUserStore"; // 스토어 경로에 맞게 수정

export default function ProtectedRoute({ requireAdmin = false }) {
  const { isLoggedIn, user } = useUserStore();

  // 1. 로그인 안 되어 있으면 가차없이 로그인 페이지로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. 관리자 권한이 필요한 페이지인데 role이 admin이 아니면 메인으로 리다이렉트
  if (requireAdmin && user.role !== "admin") {
    alert("관리자만 접근할 수 있는 페이지입니다.");
    return <Navigate to="/" replace />;
  }

  // 3. 조건 다 통과하면 하위 컴포넌트(원래 가려던 페이지)로 진입 허용
  return <Outlet />;
}
