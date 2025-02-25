import { useState } from "react";
import MainSection from "./Companent/MainSection";
import Navbar from "./Companent/Navbar";
import Sidebar from "./Companent/Sidebar";
import LoginPage from "./Pages/LoginPage";
import useAuthStore from "./store/my-store";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const authState = useAuthStore();

  return (
    <div className="h-[100vh] overflow-y-hidden">
      {authState.token ? (
        <>
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="flex h-full ">
            <Sidebar collapsed={collapsed} />

            <MainSection />
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
