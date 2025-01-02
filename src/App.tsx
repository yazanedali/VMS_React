import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from "./components/Slidebar";
import Overview from "./Pages/Overview";
import VillageManagement from "./Pages/VillageManagement";
import Chat from "./Pages/Chat";
import Gallery from "./Pages/Gallery";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";

const ProtectedRoute: React.FC<{ isAuthenticated: boolean; children: JSX.Element }> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true" // قراءة الحالة من localStorage عند تحميل التطبيق
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="flex">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsAuthenticated={setIsAuthenticated} />
                <div
                  className={`flex-1 my-5 p-6 md:ml-64 h-full transition-all duration-300 ${
                    isOpen ? "ml-64" : "ml-0"
                  } md:ml-0 md:pl-6`}
                >
                  <Routes>
                    <Route path="/Home" element={<Overview />} />
                    <Route path="/village-management" element={<VillageManagement />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/gallery" element={<Gallery />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
