import "./App.css";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import AnalysisPage from "./pages/AnalysisPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import Footer from "./layouts/Footer";
import useUserStore from "./store/useUserStore";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-68px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 비로그인 유저도 접근 가능한 공용 구역
      { path: "/", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },

      // 로그인한 일반 회원만 접근 가능 구역
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/analysis", element: <AnalysisPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },

      // 관리자(Admin) 전용 구역
      {
        element: <ProtectedRoute requireAdmin={true} />,
        children: [{ path: "/admin", element: <AdminPage /> }],
      },
    ],
  },
]);

function App() {
  const initializeAuth = useUserStore((state) => state.initializeAuth);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await initializeAuth();
      setIsVerifying(false);
    };
    verify();
  }, [initializeAuth]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black font-black uppercase tracking-widest border-16px border-black select-none">
        Verifying Session...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
