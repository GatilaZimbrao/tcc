import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar";

import { ExtensionProvider } from "../modules/extension/context/ExtensionProvider";
import { ExtensionTable } from "../modules/extension/components/ExtensionTable";
import { usePageContext } from "../modules/page/context/PageProvider";
import { useMemo } from "react";

export const ProjectPage = () => {
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
        <h1 className="w-full text-center text-gray-500">{page?.title}</h1>

        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          {page?.description}
        </p>

        <ExtensionProvider extensionType="project">
          <ExtensionTable type="project" />
        </ExtensionProvider>
      </MainComponent>
    </div>
  );
};
