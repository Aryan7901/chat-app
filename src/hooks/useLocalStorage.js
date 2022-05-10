import { useCallback, useEffect, useMemo, useState } from "react";
const PREFIX = "chat-app-";
export default function useLocalStorage(key, inValue) {
  // eslint-disable-next-line
  const initialValue = useMemo(() => inValue, []);
  let PREFIXED_KEY = PREFIX + key;
  const getVal = useCallback(() => {
    const jsonData = localStorage.getItem(PREFIXED_KEY);
    if (jsonData !== "null" && jsonData !== "undefined") {
      return JSON.parse(jsonData);
    } else if (typeof initialValue === "function") {
      return initialValue();
    } else {
      localStorage.setItem(PREFIXED_KEY, JSON.stringify(initialValue));
      return initialValue;
    }
  }, [PREFIXED_KEY, initialValue]);
  useEffect(() => {
    setValue(getVal());
  }, [getVal]);
  const [value, setValue] = useState([]);
  useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [value, PREFIXED_KEY]);
  return [value, setValue];
}
