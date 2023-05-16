import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Home = () => {
  // Management of sidebar state
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  //todo: Create a context for menu expansion
  return (
    <div className="home">
      <div className="container">
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
        <Chat
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </div>
    </div>
  );
};

export default Home;
