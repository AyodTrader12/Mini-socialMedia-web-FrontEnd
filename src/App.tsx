import { Route, Routes } from "react-router-dom";
import { GuestRoute, ProtectedRoute } from "./auth/RouteGuards";
import LoginPage from "./AuthScreen/LoginPage";
import RegisterPage from "./AuthScreen/RegisterPage";
import VerifyPage from "./AuthScreen/VerifyPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./error/NotFoundPage";
import AppShell from "./components/AppShell"
export default function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
   <Route element={<AppShell />}>
    <Route path="/" element={<HomePage />} />
  </Route>
        <Route path="/verify" element={<VerifyPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}