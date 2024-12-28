import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Slidebar";
import Overview from "./Pages/Overview";
import VillageManagement from "./Pages/VillageManagement";
import Chat from "./Pages/Chat";
import Gallery from "./Pages/Gallery";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className={`flex-1 my-5 p-6 md:ml-64 h-full transition-all duration-300 ${
        isOpen ? 'ml-64' : 'ml-0'
      } md:ml-0 md:pl-6
          `}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/village-management" element={<VillageManagement/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/gallery" element={<Gallery/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;