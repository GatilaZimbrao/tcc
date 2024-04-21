import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Contact, ListContactResponse } from "../typings/contact";
import { api } from "../../../shared/clients/APIClient";

interface ContactState {
  contacts: Contact[];
  loading: boolean;
}

type ContactAction =
  | { type: "SET_CONTACTS"; payload: Contact[] }
  | { type: "ADD_CONTACT"; payload: Contact }
  | { type: "REMOVE_CONTACT"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

interface ContactContextType extends ContactState {
  dispatch: React.Dispatch<ContactAction>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error(
      "useContactContext deve ser usado dentro de um ContactProvider"
    );
  }
  return context;
};

const contactReducer = (
  state: ContactState,
  action: ContactAction
): ContactState => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "REMOVE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
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

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: ContactState = {
    contacts: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await api.get<ListContactResponse>("/contact");

        const success = response.status === 200;

        if (success) {
          dispatch({ type: "SET_CONTACTS", payload: response.data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchContacts();
  }, []);

  const contactContextValue: ContactContextType = {
    ...state,
    dispatch,
  };

  return (
    <ContactContext.Provider value={contactContextValue}>
      {children}
    </ContactContext.Provider>
  );
};
