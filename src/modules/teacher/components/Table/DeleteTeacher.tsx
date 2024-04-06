import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "../../../../shared/clients/APIClient";
import {
  Teacher,
  GetTeacherResponse,
  ListTeacherResponse,
} from "../../typings/teacher";
import { Spinner } from "../../../../shared/styleguide/Spinner/Spinner";
import { useTeacherContext } from "../../context/TeacherProvider";
import Modal from "../../../../shared/styleguide/Modal/Modal";
import ModalConfirmation from "../../../../shared/styleguide/Modal/ModalConfirmation";

interface DeleteTeacherProps {
  teacher: Teacher;
}

const DeleteTeacher = ({ teacher }: DeleteTeacherProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useTeacherContext();

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
      api.delete(`/teacher/${teacher.id}`).then((response) => {
        if (response.status === 200) {
          dispatch({ type: "REMOVE_TEACHER", payload: teacher.id });
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
        message="Deseja excluir esse docente?"
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

export { DeleteTeacher };
