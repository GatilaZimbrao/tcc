import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar/SideBar";
import { CreateFile } from "../modules/file/components/DocumentsTable/CreateFile";

export const CreateDocumentPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1>Documentos</h1>

        <CreateFile />
      </MainComponent>
    </div>
  );
};
