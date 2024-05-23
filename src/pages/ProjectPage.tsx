import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar";

import { ExtensionProvider } from "../modules/extension/context/ExtensionProvider";
import { ExtensionTable } from "../modules/extension/components/ExtensionTable";

export const ProjectPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center text-gray-500">
          Projetos de Extensão
        </h1>

        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          {/* Se você tem alguma dúvida, sugestão, ou deseja mais informações, Entre
          em contato. */}
        </p>

        <ExtensionProvider extensionType="project">
          <ExtensionTable type="project" />
        </ExtensionProvider>
      </MainComponent>
    </div>
  );
};
