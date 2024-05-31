import { useMemo } from "react";
import { usePageContext } from "../modules/page/context/PageProvider";
import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { UpdatePageHome } from "../shared/components/MainComponent/UpdatePageHome";
import { SideBar } from "../shared/components/SideBar";

export const HomePage = () => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent UpdatePageComponent={UpdatePageHome}>
        <h1 className="w-full text-center text-gray-500">{page?.title}</h1>

        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          {page?.description}
        </p>

        {page?.additionalParams?.imageUrl && (
          <img
            className="rounded-2xl"
            src={page?.additionalParams?.imageUrl}
            alt={"Foto do CEFET Nova Friburgo"}
            width={"100%"}
            // height={"100"}
          />
        )}
      </MainComponent>
    </div>
  );
};
