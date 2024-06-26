import { CreateTeacher } from "./CreateTeacher";
import { useTeacherContext } from "../../context/TeacherProvider";
import { Link } from "react-router-dom";
import TeacherImage from "./TeacherImage";
import { DeleteTeacher } from "./DeleteTeacher";
import { UpdateTeacher } from "./UpdateTeacher";
import SearchTeacher from "./SearchTeacher";
import { AdminOnly } from "../../../../shared/utils/IsAdmin";

const TeacherTable = () => {
  const { teachers } = useTeacherContext();

  return (
    <div className="overflow-x-auto rounded-lg max-h-[70vh] p-4 w-full">
      <div className="flex justify-between items-center mb-4 mt-2 gap-4">
        <SearchTeacher />

        <AdminOnly>
          <CreateTeacher />
        </AdminOnly>
      </div>
      <table className="w-full text-sm text-left text-gray-500  shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Formação
            </th>
            <th scope="col" className="px-6 py-3">
              Currículo Lattes
            </th>

            <AdminOnly>
              <th scope="col" colSpan={1} className="px-6 py-3">
                Ações
              </th>
            </AdminOnly>
          </tr>
        </thead>
        <tbody>
          {teachers.map((item) => {
            return (
              <tr
                key={`teacher-table-${item.id}`}
                className="bg-white border-b   hover:bg-gray-50 "
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <TeacherImage
                    src={item.image}
                    alt={`${item.name}-foto`}
                  ></TeacherImage>
                </td>
                <td scope="row" className="px-6 py-4  whitespace-nowrap ">
                  <div className="text-base font-bold text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm font-normal capitalize text-gray-600">
                    {item.type}
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap "
                >
                  {item.education}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap "
                >
                  <Link to={item.linkLattes} target="_blank">
                    <span className="text-link">{item.linkLattes}</span>
                  </Link>
                </td>

                <AdminOnly>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    <span className="mr-2">
                      <DeleteTeacher teacher={item} />
                    </span>

                    <span>
                      <UpdateTeacher teacher={item} />
                    </span>
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

export { TeacherTable };
