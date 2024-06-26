import { useMemo } from "react";
import { usePageContext } from "../modules/page/context/PageProvider";
import { PageLayout } from "../shared/components/PageLayout/PageLayout";
import { UpdatePageHome } from "../shared/components/PageLayout/UpdatePageHome";

export const HomePage = () => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  return (
    <PageLayout UpdatePageComponent={UpdatePageHome}>
      <h1 className="w-full text-center text-gray-500 text-3xl lg:text-4xl px-6 lg:px-12">
        {page?.title}
      </h1>

      {page?.description && (
        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          {page?.description}
        </p>
      )}

      {page?.additionalParams?.imageUrl && (
        <img
          className="rounded-2xl"
          src={page?.additionalParams?.imageUrl}
          alt={"Foto do CEFET Nova Friburgo"}
          width={"100%"}
        />
      )}
    </PageLayout>
  );
};
