import React, { useState } from "react";
import Button from "../../ui/Button";
import { useConversations } from "../../context/ConversationsProvider";
import { useContacts } from "../../context/ContactsProvider";

export default function ConversationsModal({ showModal, setShowModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const newConversation = (event) => {
    event.preventDefault();
    createConversation(selectedContacts);
    setSelectedContacts([]);
    setShowModal(false);
  };
  const closeModal = () => {
    setSelectedContacts([]);
    setShowModal(false);
  };
  const checkboxChangeHandler = (event) => {
    if (
      event.target.checked &&
      !selectedContacts.includes(event.target.value)
    ) {
      setSelectedContacts((prevContacts) => {
        return [...prevContacts, event.target.value];
      });
    } else if (
      !event.target.checked ||
      selectedContacts.includes(event.target.value)
    ) {
      setSelectedContacts((prevContacts) => {
        console.log(prevContacts);
        const filteredContacts = prevContacts.filter((contact) => {
          console.log(event.target.value, contact);
          return contact !== event.target.value;
        });
        console.log(filteredContacts);
        return filteredContacts;
      });
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">
                    Create Conversation
                  </h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  <form onSubmit={newConversation} className="flex flex-col ">
                    <div className="overflow-auto max-h-60">
                      {contacts &&
                        contacts.map((contact, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-center "
                            >
                              <div className="inline-block w-1/3">
                                <label
                                  htmlFor={contact.id}
                                  className="text-lg font-semibold"
                                >
                                  {contact.name}
                                </label>
                              </div>
                              <input
                                id={contact.id}
                                value={contact.id}
                                type="checkbox"
                                onChangeCapture={checkboxChangeHandler}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-300"
                              />
                            </div>
                          );
                        })}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                      <Button
                        className="text-red-500 bg-transparent active:bg-red-500 active:text-white"
                        type="button"
                        onClick={closeModal}
                      >
                        Close
                      </Button>
                      <Button
                        className="text-blue-500 bg-transparent active:bg-blue-500 active:text-white"
                        type="submit"
                      >
                        Add Conversation
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
