import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar/SideBar";

import { DocumentsTable } from "../modules/file/components/DocumentsTable/DocumentsTable";
import { TeacherProvider } from "../modules/teacher/context/TeacherProvider";
import { TeacherTable } from "../modules/teacher/components/Table/TeacherTable";

export const TeacherPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center">Docentes</h1>

        <TeacherProvider>
          <TeacherTable />
        </TeacherProvider>
      </MainComponent>
    </div>
  );
};
