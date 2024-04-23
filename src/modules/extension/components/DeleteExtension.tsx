import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Extension } from "../typings/extension";
import { useExtensionContext } from "../context/ExtensionProvider";
import { api } from "../../../shared/clients/APIClient";
import ModalConfirmation from "../../../shared/styleguide/Modal/ModalConfirmation";
import { Spinner } from "../../../shared/styleguide/Spinner/Spinner";

interface DeleteExtensionProps {
  extension: Extension;
}

const DeleteExtension = ({ extension }: DeleteExtensionProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useExtensionContext();

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
      api.delete(`/extension/${extension.id}`).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "REMOVE_EXTENSION", payload: extension.id });
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
        message="Deseja excluir esse registro?"
        cancelText="Cancelar"
        confirmText="Confirmar"
        onConfirm={handleDelete}
      />
      <button
        className="p-4 shadow-md bg-gray-50 cursor-pointer rounded"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : <FiTrash />}
      </button>
    </>
  );
};

export { DeleteExtension };
