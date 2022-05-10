import React, { useRef } from "react";
import { v4 } from "uuid";
import Button from "../ui/Button";
import Input from "../ui/Input";
export default function Login({ idSetter }) {
  const idRef = useRef();
  const createNewId = () => {
    idSetter(v4());
  };
  const submitHandler = (event) => {
    event.preventDefault();
    idSetter(idRef.current.value);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center justify-center space-y-10 h-96"
    >
      <label htmlFor="IdInput" className="text-xl">
        Enter ID
      </label>
      <Input type="text" ref={idRef} id="IdInput" required />
      <div>
        <Button type="submit">Login</Button>
        <Button
          onClick={createNewId}
          className="ml-2 bg-slate-400 active:bg-slate-500"
        >
          Create New Id
        </Button>
      </div>
    </form>
  );
}
