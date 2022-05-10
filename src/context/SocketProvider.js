import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
const SocketContext = React.createContext();
export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
      { query: { id } }
    );
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
