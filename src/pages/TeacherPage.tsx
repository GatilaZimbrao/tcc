import { MainComponent } from "../shared/components/MainComponent";
import { SideBar } from "../shared/components/SideBar";

import { TeacherProvider } from "../modules/teacher/context/TeacherProvider";
import { TeacherTable } from "../modules/teacher/components/Table/TeacherTable";

export const TeacherPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center">Corpo Docente</h1>

        <p className="w-3/4 text-center mt-4 mb-4 text-gray-500 text-xl">
          Aqui você encontrará todos os membros do nosso corpo docente, além dos
          links para seus Currículos Lattes, onde poderão ser encontradas mais
          informações
        </p>
        <TeacherProvider>
          <TeacherTable />
        </TeacherProvider>
      </MainComponent>
    </div>
  );
};
