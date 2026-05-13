import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import AnalysisPage from "./pages/AnalysisPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import Footer from "./layouts/Footer";

// 1. 모든 페이지에 공통으로 들어갈 레이아웃 컴포넌트
function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-68px)]">
        {/* Outlet이 Routes 역할을 대신해서 각 페이지를 여기에 뿌려줘 */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// 2. 라우터 설정 (Data Router 방식)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 전체 레이아웃을 감싸고
    children: [
      { path: "/", element: <AnalysisPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);

function App() {
  // 3. RouterProvider로 라우터 주입
  return <RouterProvider router={router} />;
}

export default App;
