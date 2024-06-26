import { PageLayout } from "../shared/components/PageLayout/PageLayout";

import { ContactProvider } from "../modules/contact/context/ContactProvider";
import { ContactTable } from "../modules/contact/components/ContactTable";
import { usePageContext } from "../modules/page/context/PageProvider";
import { useMemo } from "react";

export const ContactPage = () => {
  const { pages } = usePageContext();

  const page = useMemo(() => {
    const pathname = location.pathname;

    const finded = pages.find((page) => page.pathName === pathname);

    return finded;
  }, [pages]);

  return (
    <PageLayout>
      <h1 className="w-full text-center text-gray-500 text-3xl lg:text-4xl px-6 lg:px-12">
        {page?.title}
      </h1>

      {page?.description && (
        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          {page?.description}
        </p>
      )}

      <ContactProvider>
        <ContactTable />
      </ContactProvider>
    </PageLayout>
  );
};
