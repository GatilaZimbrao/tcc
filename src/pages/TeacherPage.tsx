import { SideBar } from "../shared/components/SideBar";

import { TeacherProvider } from "../modules/teacher/context/TeacherProvider";
import { TeacherTable } from "../modules/teacher/components/Table/TeacherTable";
import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { usePageContext } from "../modules/page/context/PageProvider";
import { useMemo } from "react";

export const TeacherPage = () => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center">{page?.title}</h1>

        <p className="w-3/4 text-center mt-4 mb-4 text-gray-500 text-xl">
          {page?.description}
        </p>
        <TeacherProvider>
          <TeacherTable />
        </TeacherProvider>
      </MainComponent>
    </div>
  );
};
