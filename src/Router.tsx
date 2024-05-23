import { Routes, Route, Navigate } from "react-router-dom";
import { Test } from "./pages/Test";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { PageProvider } from "./modules/page/context/PageProvider";
import { ProtectedRoute } from "./shared/utils/ProtectedRoute";
import { PrivateTest } from "./pages/PrivateTest";
import { TeacherPage } from "./pages/TeacherPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { ContactPage } from "./pages/ContactPage";
import { ProgramPage } from "./pages/ProgramPage";
import { ProjectPage } from "./pages/ProjectPage";

function Router() {
  return (
    <AuthProvider>
      <PageProvider>
        <div className="flex min-h-screen w-full bg-gray-200">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<PrivateTest />} />
              <Route path="/documentos" element={<DocumentsPage />} />
              <Route path="/docentes" element={<TeacherPage />} />
              <Route path="/contato" element={<ContactPage />} />

              <Route path="/programas" element={<ProgramPage />} />
              <Route path="/projetos" element={<ProjectPage />} />
            </Route>
          </Routes>
        </div>
      </PageProvider>
    </AuthProvider>
  );
}

export default Router;
