import { useState } from "react";
import { FiEye, FiTrash } from "react-icons/fi";
import { Extension } from "../typings/extension";
import { useExtensionContext } from "../context/ExtensionProvider";
import { api } from "../../../shared/clients/APIClient";
import ModalConfirmation from "../../../shared/styleguide/Modal/ModalConfirmation";
import { Spinner } from "../../../shared/styleguide/Spinner/Spinner";
import Modal from "../../../shared/styleguide/Modal/Modal";
import { Link } from "react-router-dom";

interface ViewExtensionProps {
  extension: Extension;
}

const ViewExtension = ({ extension }: ViewExtensionProps) => {
  const { loading } = useExtensionContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Visualizar"
        children={
          <div className="">
            <div className="mb-4">
              <div className="text-gray-900 text-md font-bold">
                Nome da Atividade:
              </div>
              <div className="text-gray-500 text-md font-normal">
                {extension.name}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-900 text-md font-bold">Resumo:</div>
              <div className=" text-gray-500 text-sm font-normal break-normal whitespace-normal">
                {extension.abstract}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-900 text-md font-bold">Docentes:</div>
              <div className="text-gray-500 text-sm font-normal">
                {extension.teachers.map((teacherExtension, index) => {
                  return (
                    <p key={`extension-view-teacher-${index}`}>
                      {teacherExtension.teacher.name}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-900 text-md font-bold">
                Email para contato:
              </div>
              <div className="text-gray-500 text-sm font-normal">
                {extension.email}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-900 text-md font-bold">Está ativa?</div>
              <div className="text-gray-500 text-sm font-normal">
                {extension.isActive ? "Sim" : "Não"}
              </div>
            </div>

            {extension.site && (
              <div className="mb-4">
                <div className="text-gray-900 text-md font-bold">Site:</div>
                <div className="text-gray-500 text-sm font-normal">
                  <Link
                    className="text-link"
                    target="_blank"
                    to={extension.site}
                  >
                    {extension.site}
                  </Link>
                </div>
              </div>
            )}
          </div>
        }
      />
      <button
        className="p-4 shadow-md bg-gray-50 cursor-pointer rounded"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : <FiEye />}
      </button>
    </>
  );
};

export { ViewExtension };
