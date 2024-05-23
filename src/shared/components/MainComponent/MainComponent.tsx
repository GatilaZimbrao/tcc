import { useEffect, useMemo } from "react";
import { usePageContext } from "../../../modules/page/context/PageProvider";
import { UpdatePage } from "./UpdatePage";
import { AdminOnly } from "../../utils/IsAdmin";

type MainComponentProps = React.HTMLProps<HTMLButtonElement>;

const MainComponent = ({ children }: MainComponentProps) => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  return (
    <div className="main-component--container w-full flex-1 flex items-center justify-center p-16 rounded-2xl m-auto">
      <div className=" flex flex-col items-center  justify-center p-4 rounded-2xl bg-white w-full relative">
        {page && (
          <AdminOnly>
            <div className="absolute top-2 right-2">
              <UpdatePage page={page}></UpdatePage>
            </div>
          </AdminOnly>
        )}
        {children}
      </div>
    </div>
  );
};

export { MainComponent };
