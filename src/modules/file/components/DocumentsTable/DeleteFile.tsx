import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "../../../../shared/clients/APIClient";
import { File, GetFileResponse, ListFileResponse } from "../../typings/file";
import { Spinner } from "../../../../shared/styleguide/Spinner/Spinner";
import { useFileContext } from "../../context/FileProvider";
import ModalConfirmation from "../../../../shared/styleguide/Modal/ModalConfirmation";

interface DocumentsTableProps {
  file: File;
}

const DeleteFile = ({ file }: DocumentsTableProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useFileContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      api.delete(`/file/${file.id}`).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "REMOVE_FILE", payload: file.id });
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalConfirmation
        isOpen={isOpen}
        onClose={handleCloseModal}
        message="Deseja excluir esse arquivo?"
        cancelText="Cancelar"
        confirmText="Confirmar"
        onConfirm={handleDelete}
      />
      <button
        className="p-4 shadow-md bg-gray-50 flex cursor-pointer rounded"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : <FiTrash />}
      </button>
    </>
  );
};

export { DeleteFile };
