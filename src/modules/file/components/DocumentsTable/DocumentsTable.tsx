import { DownloadFile } from "./DownloadFile";
import { DeleteFile } from "./DeleteFile";
import { useFileContext } from "../../context/FileProvider";
import { Button } from "../../../../shared/styleguide/Button/Button";
import { Link } from "react-router-dom";
import { CreateFile } from "./CreateFile";
import { useState } from "react";
import SearchFile from "./SearchFile";
import { AdminOnly } from "../../../../shared/utils/IsAdmin";

const DocumentsTable = () => {
  const { files } = useFileContext();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="overflow-x-auto sm:rounded-lg p-4 w-full">
      <AdminOnly>
        <CreateFile
          openModal={openModal}
          setOpenModal={setOpenModal}
        ></CreateFile>
      </AdminOnly>
      <div className="flex justify-between items-center mb-4 mt-2 gap-4">
        <SearchFile />
        <AdminOnly>
          <Button apperance="primary" onClick={() => setOpenModal(true)}>
            Criar
          </Button>
        </AdminOnly>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome do Arquivo
            </th>
            <th scope="col" colSpan={1} className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((item) => {
            return (
              <tr
                key={`documents-table-${item.id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex">
                  <span className=" mr-1">
                    <DownloadFile file={item} />
                  </span>

                  <AdminOnly>
                    <span>
                      <DeleteFile file={item} />
                    </span>
                  </AdminOnly>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { DocumentsTable };
