import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={
        props.className +
        " relative w-full px-3 py-3 pt-0 mb-3 text-sm bg-white border-0 rounded shadow outline-none placeholder-slate-300 text-slate-600 focus:outline-none focus:ring "
      }
    />
  );
});
export default Input;
