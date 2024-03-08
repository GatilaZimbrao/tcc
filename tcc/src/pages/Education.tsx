import { useEffect, useMemo, useState } from "react";
import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar/SideBar";
import { api } from "../shared/clients/APIClient";
import { File, ListFileResponse } from "../modules/file/typings/file";
import { DocumentsTable } from "../modules/file/components/DocumentsTable/DocumentsTable";
import { FileProvider } from "../modules/file/context/FileProvider";
import { Button } from "../shared/styleguide/Button/Button";
import { Link } from "react-router-dom";

export const Education = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1 className="w-full text-center">Documentos</h1>

        <FileProvider>
          <DocumentsTable />
        </FileProvider>
      </MainComponent>
    </div>
  );
};
