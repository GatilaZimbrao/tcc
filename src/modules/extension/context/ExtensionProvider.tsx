import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Extension, ListExtensionResponse } from "../typings/extension";
import { api } from "../../../shared/clients/APIClient";
import { ExtensionTypes } from "../typings/extensionTypes";

interface ExtensionState {
  extensions: Extension[];
  loading: boolean;
}

type ExtensionAction =
  | { type: "SET_EXTENSIONS"; payload: Extension[] }
  | { type: "ADD_EXTENSION"; payload: Extension }
  | { type: "REMOVE_EXTENSION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

interface ExtensionContextType extends ExtensionState {
  dispatch: React.Dispatch<ExtensionAction>;
}

const ExtensionContext = createContext<ExtensionContextType | undefined>(
  undefined
);

export const useExtensionContext = () => {
  const context = useContext(ExtensionContext);
  if (!context) {
    throw new Error(
      "useExtensionContext deve ser usado dentro de um ExtensionProvider"
    );
  }
  return context;
};

const extensionReducer = (
  state: ExtensionState,
  action: ExtensionAction
): ExtensionState => {
  switch (action.type) {
    case "SET_EXTENSIONS":
      return {
        ...state,
        extensions: action.payload,
        loading: false,
      };
    case "ADD_EXTENSION":
      return {
        ...state,
        extensions: [...state.extensions, action.payload],
      };
    case "REMOVE_EXTENSION":
      return {
        ...state,
        extensions: state.extensions.filter(
          (extension) => extension.id !== action.payload
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

export const ExtensionProvider: React.FC<{
  children: React.ReactNode;
  extensionType: ExtensionTypes;
}> = ({ children, extensionType }) => {
  const initialState: ExtensionState = {
    extensions: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(extensionReducer, initialState);

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await api.get<ListExtensionResponse>(
          `/extension?type=${extensionType}`
        );

        const success = response.status === 200;

        if (success) {
          dispatch({ type: "SET_EXTENSIONS", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchExtensions();
  }, []);

  const extensionContextValue: ExtensionContextType = {
    ...state,
    dispatch,
  };

  return (
    <ExtensionContext.Provider value={extensionContextValue}>
      {children}
    </ExtensionContext.Provider>
  );
};
