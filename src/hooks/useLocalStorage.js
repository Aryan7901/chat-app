import { useCallback, useEffect, useMemo, useState } from "react";
const PREFIX = "chat-app-";
export default function useLocalStorage(key, inValue) {
  //eslint-disable-next-line
  const initialValue = useMemo(() => inValue, []);
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
  const val = useMemo(() => getVal(), [getVal]);
  useEffect(() => {
    setValue(val);
  }, [val]);
  const [value, setValue] = useState(val);
  useEffect(() => {
    localStorage.setItem(PREFIXED_KEY, JSON.stringify(value));
  }, [value, PREFIXED_KEY, initialValue]);
  return [value, setValue];
}
