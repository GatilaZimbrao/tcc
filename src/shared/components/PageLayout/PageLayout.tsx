import { useEffect, useMemo } from "react";
import { usePageContext } from "../../../modules/page/context/PageProvider";
import { AdminOnly } from "../../utils/IsAdmin";
import { Page } from "../../../modules/page/typings/page";
import { UpdatePage } from "./UpdatePage";
import { SideBar } from "../SideBar";

type PageLayoutProps = React.HTMLProps<HTMLButtonElement> & {
  UpdatePageComponent?: React.ComponentType<{ page: Page }>;
};

const PageLayout = ({
  children,
  UpdatePageComponent = UpdatePage,
}: PageLayoutProps) => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <SideBar />
      <div className="main-component--container max-h-[100vh] w-full flex-1 flex items-center justify-center p-4 md:p-8 lg:p-16 rounded-2xl m-auto">
        <div className=" flex flex-col items-center justify-center p-4 rounded-2xl bg-white w-full relative">
          {page && (
            <AdminOnly>
              <div className="absolute top-2 right-2">
                <UpdatePageComponent page={page} />
              </div>
            </AdminOnly>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export { PageLayout };
