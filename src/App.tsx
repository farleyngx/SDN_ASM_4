import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/dashboard';
import QuizSessionPage from './pages/quiz-session';
import AdminDashboardPage from './pages/admin-dashboard';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Các tuyến đường công khai công cộng */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Phân hệ bảo vệ dành riêng cho SINH VIÊN / USER THƯỜNG */}
      <Route element={<ProtectedRoute requireAdmin={false} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/quiz" element={<QuizSessionPage />} />
      </Route>

      {/* Phân hệ bảo vệ dành riêng cho QUẢN TRỊ VIÊN / ADMIN */}
      <Route element={<ProtectedRoute requireAdmin={true} />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Route>

      {/* Điều hướng mặc định nếu gõ sai URL */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
