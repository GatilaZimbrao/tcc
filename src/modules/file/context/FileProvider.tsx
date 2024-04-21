import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { File, ListFileResponse } from "../typings/file";
import { api } from "../../../shared/clients/APIClient";

interface FileState {
  files: File[];
  loading: boolean;
}

type FileAction =
  | { type: "SET_FILES"; payload: File[] }
  | { type: "ADD_FILE"; payload: File }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

interface FileContextType extends FileState {
  dispatch: React.Dispatch<FileAction>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext deve ser usado dentro de um FileProvider");
  }
  return context;
};

const fileReducer = (state: FileState, action: FileAction): FileState => {
  switch (action.type) {
    case "SET_FILES":
      return {
        ...state,
        files: action.payload,
        loading: false,
      };
    case "ADD_FILE":
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case "REMOVE_FILE":
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload),
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

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: FileState = {
    files: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(fileReducer, initialState);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await api.get<ListFileResponse>("/file");

        const success = response.status === 200;

        if (success) {
          dispatch({ type: "SET_FILES", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchFiles();
  }, []);

  const fileContextValue: FileContextType = {
    ...state,
    dispatch,
  };

  return (
    <FileContext.Provider value={fileContextValue}>
      {children}
    </FileContext.Provider>
  );
};
