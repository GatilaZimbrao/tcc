import { Routes, Route, Navigate } from "react-router-dom";
import { Test } from "./pages/Test";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { ProtectedRoute } from "./shared/utils/ProtectedRoute";
import { PrivateTest } from "./pages/PrivateTest";
import { TeacherPage } from "./pages/TeacherPage";
import { DocumentsPage } from "./pages/DocumentsPage";

function Router() {
  return (
    //Providers

    <AuthProvider>
      <div className="flex min-h-screen w-full bg-gray-200">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<PrivateTest />} />
            <Route path="/documentos" element={<DocumentsPage />} />
            <Route path="/docentes" element={<TeacherPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default Router;
