import "./styles/App.css";
import { PocketBaseProvider } from "./context/Pocketbase";
import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <>
      <PocketBaseProvider>
        <Outlet />
      </PocketBaseProvider>
      <ScrollRestoration />
    </>
  );
}

export default App;
