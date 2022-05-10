import React, { useCallback, useState } from "react";
import { useConversations } from "../../context/ConversationsProvider";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export default function DisplayConversations() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }
  const inputHandler = (event) => {
    setText(event.target.value);
  };
  return (
    <div className="flex flex-col justify-between flex-grow max-h-screen">
      <div className="flex-grow overflow-auto">
        <div className="flex flex-col items-start justify-center px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                key={index}
                ref={lastMessage ? setRef : null}
                className={`flex flex-col ${
                  message.fromMe ? "self-end" : "self-start"
                }`}
              >
                <div
                  className={`rounded px-4 py-1 my-1 text-white ${
                    message.fromMe ? "bg-blue-400 " : "bg-green-400"
                  }`}
                >
                  {message.text}
                </div>
                <div className={`text-slate-400 text-xs my-1 `}>
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex mb-2 max-h-14">
        <Input
          className="h-full mb-0 border border-slate-300"
          onChange={inputHandler}
          required
          value={text}
        />
        <Button className="h-full mb-0 " type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
