import { MainComponent } from "../shared/components/MainComponent";
import { SideBar } from "../shared/components/SideBar";

import { DocumentsTable } from "../modules/file/components/DocumentsTable/DocumentsTable";
import { FileProvider } from "../modules/file/context/FileProvider";

export const DocumentsPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center">Documentos Institucionais</h1>

        <p className="w-full text-center mt-4 mb-4 text-gray-500 text-xl">
          Aqui você vai encontrar todos os documentos institucionais que
          precisar.
        </p>
        <FileProvider>
          <DocumentsTable />
        </FileProvider>
      </MainComponent>
    </div>
  );
};
