import React from "react";
import { useConversations } from "../../context/ConversationsProvider";
import ConversationItem from "./ConversationItem";

export default function Conversations() {
  const {
    conversations,
    selectedConversationIndex,
    setSelectedConversationIndex,
  } = useConversations();
  return (
    <>
      {conversations &&
        conversations.map((conversation, index) => {
          return (
            <ConversationItem
              key={index}
              className={
                selectedConversationIndex === index
                  ? " bg-blue-500 text-white"
                  : ""
              }
              selectHandler={() => setSelectedConversationIndex(index)}
            >
              {conversation.recipients.map((r) => r.name).join(", ")}
            </ConversationItem>
          );
        })}
    </>
  );
}
