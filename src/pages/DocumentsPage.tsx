import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar";

import { DocumentsTable } from "../modules/file/components/DocumentsTable/DocumentsTable";
import { FileProvider } from "../modules/file/context/FileProvider";
import { usePageContext } from "../modules/page/context/PageProvider";
import { useMemo } from "react";

export const DocumentsPage = () => {
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

        <p className="w-full text-center mt-4 mb-4 text-gray-500 text-xl">
          {page?.description}
        </p>
        <FileProvider>
          <DocumentsTable />
        </FileProvider>
      </MainComponent>
    </div>
  );
};
