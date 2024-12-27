
import React from "react";
import Overview from "../Pages/Overview";

interface ContentProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content: React.FC<ContentProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`flex-1 min-h-screen p-6 bg-gray-900 text-white transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      } md:ml-64`}
    >
      <button
        className="md:hidden text-2xl mb-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>
      <div className="mt-4">
        {/* <Overview isSidebarOpen = {false} /> */}
      </div>
    </div>
  );
};

export default Content;
