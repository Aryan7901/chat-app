import { useEffect, useState } from "react";
const PREFIX = "chat-app-";
export default function useLocalStorage(key, initialValue) {
  let PREFIXED_KEY = PREFIX + key;
  const getVal = () => {
    const jsonData = localStorage.getItem(PREFIXED_KEY);
    if (jsonData !== "null" && jsonData !== "undefined") {
      return JSON.parse(jsonData);
    } else if (typeof initialValue === "function") {
      return initialValue();
    } else {
      localStorage.setItem(PREFIXED_KEY, JSON.stringify(initialValue));
      return initialValue;
    }
  };
  const [value, setValue] = useState(getVal());
  useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [value, PREFIXED_KEY]);
  return [value, setValue];
}
