import { AdminOnly } from "../../../shared/utils/IsAdmin";
import { useExtensionContext } from "../context/ExtensionProvider";
import { ExtensionTypes } from "../typings/extensionTypes";
import { CreateExtension } from "./CreateExtension";
import { DeleteExtension } from "./DeleteExtension";
import SearchExtension from "./SearchExtension";
import { UpdateExtension } from "./UpdateExtension";
import { ViewExtension } from "./ViewExtension";

interface ExtensionTableProps {
  type: ExtensionTypes;
}

const ExtensionTable = ({ type }: ExtensionTableProps) => {
  const { extensions } = useExtensionContext();

  return (
    <div className="overflow-x-auto sm:rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4 mt-2 gap-4">
        <SearchExtension extensionType={type} />

        <AdminOnly>
          <CreateExtension type={type} />
        </AdminOnly>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Docentes
            </th>
            <th scope="col" className="px-6 py-3">
              Está ativa?
            </th>

            <th scope="col" colSpan={1} className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {extensions.map((item) => {
            return (
              <tr
                key={`extension-table-${item.id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4  whitespace-nowrap dark:text-white"
                >
                  <div className="text-base font-bold text-gray-900">
                    {item.name}
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.teachers.map((teacherExtension, index) => {
                    return (
                      <p key={`extension-table-teacher-${index}`}>
                        {teacherExtension.teacher.name}
                      </p>
                    );
                  })}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.isActive ? "Sim" : "Não"}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>
                    <ViewExtension extension={item} />
                  </span>

                  <AdminOnly>
                    <span className="ml-2">
                      <DeleteExtension extension={item} />
                    </span>

                    <span className="ml-2">
                      <UpdateExtension extension={item} />
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

export { ExtensionTable };
