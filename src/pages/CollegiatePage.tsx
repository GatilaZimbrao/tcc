import { SideBar } from "../shared/components/SideBar";

import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { usePageContext } from "../modules/page/context/PageProvider";
import { useMemo } from "react";
import { UpdatePageCollegiate } from "../shared/components/MainComponent/UpdatePageCollegiate";
import { Link } from "react-router-dom";

export const CollegiatePage = () => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  console.log("pagepagepage");
  console.log(page);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent UpdatePageComponent={UpdatePageCollegiate}>
        <h1 className="w-full text-center">{page?.title}</h1>

        <p className="w-3/4 text-center mt-4 mb-4 text-gray-500 text-xl">
          {page?.description}
        </p>

        <div className="w-3/4 text-center mt-4 mb-4 text-gray-500 text-lg">
          {page?.additionalParams?.minutesLink && (
            <div className="flex flex-col mb-4">
              <span className="font-medium mb-2">Link para ATAS:</span>

              <Link to={page?.additionalParams?.minutesLink} target="_blank">
                <span className="text-link text-base">
                  {page?.additionalParams?.minutesLink}
                </span>
              </Link>
            </div>
          )}

          {page?.additionalParams?.cepeLink && (
            <div className="flex flex-col mb-4">
              <span className="font-medium mb-2">Link para o CEPE:</span>

              <Link to={page?.additionalParams?.cepeLink} target="_blank">
                <span className="text-link text-base">
                  {page?.additionalParams?.cepeLink}
                </span>
              </Link>
            </div>
          )}
        </div>
      </MainComponent>
    </div>
  );
};
