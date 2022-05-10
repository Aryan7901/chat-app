import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext([
  {
    id: String,
    name: String,
  },
]);
export function useContacts() {
  return useContext(ContactsContext);
}

export default function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  function createContact(id, name) {
    if (contacts && contacts.length > 0) {
      setContacts((prevContacts) => {
        return [...prevContacts, { id, name }];
      });
    } else {
      setContacts([{ id, name }]);
    }
  }
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
