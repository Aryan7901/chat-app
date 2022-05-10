import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = createContext([
  {
    recipients: [],
    messages: [],
  },
]);
export function useConversations() {
  return useContext(ConversationsContext);
}
const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
};
export default function ConversationsProvider({ children, id }) {
  const { contacts } = useContacts();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const socket = useSocket();
  function createConversation(recipients) {
    if (recipients && recipients.length > 0) {
      if (conversations && conversations.length > 0) {
        setConversations((prevConv) => {
          return [...prevConv, { recipients, messages: [] }];
        });
      } else {
        setConversations([{ recipients, messages: [] }]);
      }
    }
  }
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConv) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConv.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });
        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConv, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );
  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    return () => socket.off("receive-message");
  });
  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }
  const formattedConversations =
    conversations !== null && conversations.length > 0
      ? conversations.map((conversation, index) => {
          const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find(
              (contact) => contact.id === recipient
            );
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
          });
          const messages = conversation.messages.map((message) => {
            const contact = contacts.find((contact) => {
              return contact.id === message.sender;
            });
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderName: name, fromMe };
          });
          const selected = index === selectedConversationIndex;
          return { ...conversation, messages, recipients, selected };
        })
      : [];
  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        selectedConversationIndex,
        sendMessage,
        setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex],
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
