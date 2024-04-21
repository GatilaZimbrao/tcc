// import { Button } from "../../../../shared/styleguide/Button/Button";
// import { CreateExtension } from "./CreateExtension";
// import { useState } from "react";
// import { useExtensionContext } from "../../context/ExtensionProvider";
// import { Link } from "react-router-dom";
// import ExtensionImage from "./ExtensionImage";
// import { DeleteExtension } from "./DeleteExtension";
// import Modal from "../../../../shared/styleguide/Modal/Modal";
// import { UpdateExtension } from "./UpdateExtension";
// import SearchExtension from "./SearchExtension";
// import { AdminOnly } from "../../../../shared/utils/IsAdmin";

import { AdminOnly } from "../../../shared/utils/IsAdmin";
import { useExtensionContext } from "../context/ExtensionProvider";

const ExtensionTable = () => {
  const { extensions } = useExtensionContext();

  return (
    <div className="overflow-x-auto sm:rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4 mt-2 gap-4">
        {/* <SearchExtension />

        <AdminOnly>
          <CreateExtension />
        </AdminOnly> */}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Formação
            </th>

            <AdminOnly>
              <th scope="col" colSpan={1} className="px-6 py-3">
                Ações
              </th>
            </AdminOnly>
          </tr>
        </thead>
        <tbody>
          {extensions.map((item) => {
            return (
              <tr
                key={`documents-table-${item.id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4  whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-bold text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm font-normal capitalize text-gray-600">
                    {item.type}
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.abstract}
                </td>

                <AdminOnly>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {/* <span className="mr-2">
                      <DeleteExtension extension={item} />
                    </span>

                    <span>
                      <UpdateExtension extension={item} />
                    </span> */}
                  </td>
                </AdminOnly>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { ExtensionTable };
