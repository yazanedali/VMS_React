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
        {/* السايدبار مع حالة isOpen */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* المحتوى الذي سيملأ الشاشة */}
        <div className="flex-1 bg-gray-900 p-6 md:ml-64">
          <Routes>
            <Route path="/" element={<Overview isOpen={isOpen} />} />
            <Route path="/village-management" element={<VillageManagement />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
