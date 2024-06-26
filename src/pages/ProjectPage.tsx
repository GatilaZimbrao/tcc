import { PageLayout } from "../shared/components/PageLayout/PageLayout";

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
    <PageLayout>
      <h1 className="w-full text-center text-gray-500 text-3xl lg:text-4xl">
        {page?.title}
      </h1>

      {page?.description && (
        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          {page?.description}
        </p>
      )}

      <ExtensionProvider extensionType="project">
        <ExtensionTable type="project" />
      </ExtensionProvider>
    </PageLayout>
  );
};
