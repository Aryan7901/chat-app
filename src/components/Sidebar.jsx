import { useState } from "react";
import Conversations from "./Conversations/Conversations";
import Contacts from "./Contacts/Contacts";
import Button from "../ui/Button";
import ContactsModal from "./Contacts/ContactsModal";
import ConversationsModal from "./Conversations/ConversationsModal";
const Sidebar = ({ bg = "blue", color = "blue", id }) => {
  const [openTab, setOpenTab] = useState(1);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [showConversationsModal, setShowConversationsModal] = useState(false);
  const showModal = () => {
    if (openTab === 1) {
      setShowConversationsModal(true);
    } else {
      setShowContactsModal(true);
    }
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="h-screen">
          <ul
            className="flex flex-row flex-wrap items-center pt-3 pb-4 mb-0 list-none h-1/6"
            role="tablist"
          >
            <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal xs:p-2 " +
                  (openTab === 1 ? "text-white " + bg : "bg-white " + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Conversations
              </a>
            </li>
            <li className="flex-auto mr-2 -mb-px text-center last:mr-0">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal xs:p-2 " +
                  (openTab === 2 ? "text-white " + bg : "bg-white " + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Contacts
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-full mb-6 break-words bg-white rounded shadow-lg h-5/6 ">
            <div className="h-full my-5 overflow-auto">
              <div className="h-full tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Conversations />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <Contacts />
                </div>
              </div>
            </div>
            <div className="overflow-hidden border-2 border-slate-200">
              <p className="self-end p-5 text-xs h-2/6">
                Your Id:<span className="text-slate-400">{id}</span>
              </p>
              <Button
                className={"w-full rounded-none h-3/6 lg:text-sm"}
                onClick={() => showModal()}
              >
                Create new {openTab === 1 ? "Conversation" : "Contact"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ContactsModal
        showModal={showContactsModal}
        setShowModal={setShowContactsModal}
      />
      <ConversationsModal
        showModal={showConversationsModal}
        setShowModal={setShowConversationsModal}
      />
    </>
  );
};
export default Sidebar;
