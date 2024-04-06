import { Button } from "../../../../shared/styleguide/Button/Button";
import { CreateTeacher } from "./CreateTeacher";
import { useState } from "react";
import { useTeacherContext } from "../../context/TeacherProvider";
import { Link } from "react-router-dom";
import TeacherImage from "./TeacherImage";
import { DeleteTeacher } from "./DeleteTeacher";
import Modal from "../../../../shared/styleguide/Modal/Modal";
import { UpdateTeacher } from "./UpdateTeacher";

const TeacherTable = () => {
  const { teachers } = useTeacherContext();

  return (
    <div className="overflow-x-auto sm:rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4 mt-2 gap-4">
        <div className=" bg-white dark:bg-gray-900 shadow-md w-full rounded-lg relative">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="w-full ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none w-full">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block w-full h-10 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>

        <CreateTeacher />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              Link Lattes
            </th>
            <th scope="col" colSpan={1} className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((item) => {
            return (
              <tr
                key={`documents-table-${item.id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <TeacherImage
                    src={item.image}
                    alt={`${item.name}-foto`}
                  ></TeacherImage>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.education}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={item.linkLattes} target="_blank">
                    <span className="text-link">{item.linkLattes}</span>
                  </Link>
                </td>

                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span className="mr-2">
                    <DeleteTeacher teacher={item} />
                  </span>

                  <span>
                    <UpdateTeacher teacher={item} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export { TeacherTable };
