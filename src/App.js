import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import ContactsProvider from "./context/ContactsProvider";
import ConversationsProvider from "./context/ConversationsProvider";
import SocketProvider from "./context/SocketProvider";
function App() {
  const [id, idSetter] = useLocalStorage("id");
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  return !id ? <Login idSetter={idSetter} /> : dashboard;
}

export default App;
