import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar/SideBar";

import { DocumentsTable } from "../modules/file/components/DocumentsTable/DocumentsTable";
import { FileProvider } from "../modules/file/context/FileProvider";

export const DocumentsPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center">Documentos</h1>

        <FileProvider>
          <DocumentsTable />
        </FileProvider>
      </MainComponent>
    </div>
  );
};
