import React from "react";

export default function ConversationItem({
  children,
  className,
  selectHandler,
}) {
  return (
    <div
      className={"p-2 my-1 shadow hover:cursor-pointer " + className}
      onClick={selectHandler}
    >
      <p className="text-lg">{children}</p>
    </div>
  );
}
