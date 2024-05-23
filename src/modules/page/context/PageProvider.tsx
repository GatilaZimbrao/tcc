import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Page, ListPageResponse } from "../typings/page";
import { api } from "../../../shared/clients/APIClient";

interface PageState {
  pages: Page[];
  loading: boolean;
}

type PageAction =
  | { type: "SET_PAGES"; payload: Page[] }
  | { type: "ADD_PAGE"; payload: Page }
  | { type: "REMOVE_PAGE"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

interface PageContextType extends PageState {
  dispatch: React.Dispatch<PageAction>;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext deve ser usado dentro de um PageProvider");
  }
  return context;
};

const pageReducer = (state: PageState, action: PageAction): PageState => {
  switch (action.type) {
    case "SET_PAGES":
      return {
        ...state,
        pages: action.payload,
        loading: false,
      };
    case "ADD_PAGE":
      return {
        ...state,
        pages: [...state.pages, action.payload],
      };
    case "REMOVE_PAGE":
      return {
        ...state,
        pages: state.pages.filter((page) => page.id !== action.payload),
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

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: PageState = {
    pages: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(pageReducer, initialState);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await api.get<ListPageResponse>("/page");

        const success = response.status === 200;

        if (success) {
          dispatch({ type: "SET_PAGES", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchPages();
  }, []);

  const pageContextValue: PageContextType = {
    ...state,
    dispatch,
  };

  return (
    <PageContext.Provider value={pageContextValue}>
      {children}
    </PageContext.Provider>
  );
};
