import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { PageProvider } from "./modules/page/context/PageProvider";
import { HomePage } from "./pages/HomePage";
import { TeacherPage } from "./pages/TeacherPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { ContactPage } from "./pages/ContactPage";
import { ProgramPage } from "./pages/ProgramPage";
import { ProjectPage } from "./pages/ProjectPage";
import { CollegiatePage } from "./pages/CollegiatePage";

function Router() {
  return (
    <AuthProvider>
      <PageProvider>
        <div className="flex min-h-screen w-full bg-gray-200">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/" element={<HomePage />} />
            <Route path="/documentos" element={<DocumentsPage />} />
            <Route path="/docentes" element={<TeacherPage />} />
            <Route path="/contato" element={<ContactPage />} />

            <Route path="/colegiado" element={<CollegiatePage />} />

            <Route path="/programas" element={<ProgramPage />} />
            <Route path="/projetos" element={<ProjectPage />} />
          </Routes>
        </div>
      </PageProvider>
    </AuthProvider>
  );
}

export default Router;
