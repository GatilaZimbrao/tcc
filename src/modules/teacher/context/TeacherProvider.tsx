import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Teacher, ListTeacherResponse } from "../typings/teacher";
import { api } from "../../../shared/clients/APIClient";

interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
}

type TeacherAction =
  | { type: "SET_TEACHERS"; payload: Teacher[] }
  | { type: "ADD_TEACHER"; payload: Teacher }
  | { type: "REMOVE_TEACHER"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

interface TeacherContextType extends TeacherState {
  dispatch: React.Dispatch<TeacherAction>;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const useTeacherContext = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error(
      "useTeacherContext deve ser usado dentro de um TeacherProvider"
    );
  }
  return context;
};

const teacherReducer = (
  state: TeacherState,
  action: TeacherAction
): TeacherState => {
  switch (action.type) {
    case "SET_TEACHERS":
      return {
        ...state,
        teachers: action.payload,
        loading: false,
      };
    case "ADD_TEACHER":
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    case "REMOVE_TEACHER":
      return {
        ...state,
        teachers: state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        ),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const TeacherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: TeacherState = {
    teachers: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(teacherReducer, initialState);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await api.get<ListTeacherResponse>("/teacher");

        const success = response.status === 200;

        if (success) {
          dispatch({ type: "SET_TEACHERS", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchTeachers();
  }, []);

  const teacherContextValue: TeacherContextType = {
    ...state,
    dispatch,
  };

  return (
    <TeacherContext.Provider value={teacherContextValue}>
      {children}
    </TeacherContext.Provider>
  );
};
