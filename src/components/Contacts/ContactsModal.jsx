import React, { useRef } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useContacts } from "../../context/ContactsProvider";

export default function ContactsModal({ showModal, setShowModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();
  const newContact = (event) => {
    event.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    setShowModal(false);
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
            <div className="relative w-auto max-w-3xl mx-auto my-6 ">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-blue-100 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h3 className="text-3xl font-semibold">Create Contact</h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6 ">
                  <form onSubmit={newContact}>
                    <label htmlFor="id">Enter Id</label>
                    <Input id="id" ref={idRef} required />
                    <label htmlFor="name">Enter Name</label>
                    <Input id="name" ref={nameRef} required />
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                      <Button
                        className="text-red-500 bg-slate-50 active:bg-red-500 active:text-white"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </Button>
                      <Button
                        className="text-blue-500 bg-slate-50 active:bg-blue-500 active:text-white"
                        type="submit"
                      >
                        Add Contact
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
