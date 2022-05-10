import { useCallback, useEffect, useMemo, useState } from "react";
const PREFIX = "chat-app-";
export default function useLocalStorage(key, inValue) {
  const initialValue = useMemo(() => inValue, [inValue]);
  let PREFIXED_KEY = PREFIX + key;
  const getVal = useCallback(() => {
    const jsonData = localStorage.getItem(PREFIXED_KEY);
    if (jsonData !== "null" && jsonData !== "undefined" && jsonData !== null) {
      return JSON.parse(jsonData);
    } else if (typeof initialValue !== "function") {
      return initialValue;
    } else {
      return initialValue();
    }
  }, [PREFIXED_KEY, initialValue]);
  useEffect(() => {
    setValue(getVal());
  }, [getVal]);
  const [value, setValue] = useState(getVal());
  useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [value, PREFIXED_KEY, initialValue]);
  return [value, setValue];
}
