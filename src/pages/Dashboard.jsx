import React from "react";
import DisplayConversations from "../components/Conversations/DisplayConversations";
import Sidebar from "../components/Sidebar";
import { useConversations } from "../context/ConversationsProvider";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  return (
    <div className="flex">
      <Sidebar bg="bg-blue-600" color="text-blue-600" id={id} />
      {selectedConversation && <DisplayConversations />}
    </div>
  );
}
