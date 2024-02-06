import { useEffect, useMemo, useState } from "react";
import { MainComponent } from "../shared/components/MainComponent/MainComponent";
import { SideBar } from "../shared/components/SideBar/SideBar";
import { api } from "../shared/clients/APIClient";
import { File, ListFileResponse } from "../modules/file/typings/file";
import { DocumentsTable } from "../modules/file/components/DocumentsTable/DocumentsTable";

export const Education = () => {
  const [loading, setLoading] = useState(false);
  const [listFile, setListFile] = useState<File[]>([]);

  const getFileList = async () => {
    setLoading(true);
    try {
      const response = await api.get<ListFileResponse>("/file/list");
      const success = response.status === 200;

      console.log("response.data", response.data);
      if (success) {
        setListFile(response.data);
      }
    } catch (_) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFileList();
  }, []);

  console.log(listFile);

  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <MainComponent>
        <h1>Documentos</h1>
        <div>TESTEEEEE</div>

        <div>{loading ? "SIM" : "NAO"}</div>
        <DocumentsTable data={listFile} />
      </MainComponent>
    </div>
  );
};
