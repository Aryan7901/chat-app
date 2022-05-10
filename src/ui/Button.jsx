import React from "react";

export default function Button({ children, className, onClick, type }) {
  return (
    <button
      className={`${className} bg-blue-500 text-white active:bg-blue-600 font-bold  px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 xs:text-xs `}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
}
