import { MainComponent } from "../shared/components/MainComponent";
import { SideBar } from "../shared/components/SideBar";

import { ContactProvider } from "../modules/contact/context/ContactProvider";
import { ContactTable } from "../modules/contact/components/ContactTable";

export const ContactPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center text-gray-500">Contato</h1>

        <p className="w-full text-center mt-4 mb-6 text-gray-500 text-xl">
          Se você tem alguma dúvida, sugestão, ou deseja mais informações, Entre
          em contato.
        </p>

        <ContactProvider>
          <ContactTable />
        </ContactProvider>
      </MainComponent>
    </div>
  );
};
