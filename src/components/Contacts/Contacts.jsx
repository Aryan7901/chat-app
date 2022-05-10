import React from "react";
import { useContacts } from "../../context/ContactsProvider";
import ContactItem from "./ContactItem";

export default function Contacts() {
  const { contacts } = useContacts();
  return (
    <>
      {contacts &&
        contacts.map((contact) => {
          return (
            <ContactItem id={contact.id} name={contact.name} key={contact.id} />
          );
        })}
    </>
  );
}
