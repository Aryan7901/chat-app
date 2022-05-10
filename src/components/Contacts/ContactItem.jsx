import React from "react";

export default function ContactItem({ name, id }) {
  return (
    <div className="p-2 my-1 shadow">
      <p className="text-lg xs:text-sm">
        {name} <span className="ml-2 text-xs text-slate-400">ID:{id}</span>
      </p>
    </div>
  );
}
