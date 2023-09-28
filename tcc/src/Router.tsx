import { Routes, Route, Navigate } from "react-router-dom";
import { Test } from "./pages/Test";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { ProtectedRoute } from "./shared/utils/ProtectedRoute";
import { PrivateTest } from "./pages/PrivateTest";
import { Education } from "./pages/Education";

function Router() {
  return (
    //Providers

    <AuthProvider>
      <div className="flex min-h-screen w-full bg-gray-200">
        <Routes>
          <Route path="/" element={<Navigate to="/olaa" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="olaa" element={<PrivateTest />} />
            <Route path="education" element={<Education />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default Router;
