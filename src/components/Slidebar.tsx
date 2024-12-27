
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-6 transform flex flex-col ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 z-40`}
    >
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <ul className="space-y-4 flex-grow">
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Overview
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Village Management
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Chat
          </a>
        </li>
        <li>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            Gallery
          </a>
        </li>
      </ul>
      <div className="flex items-center gap-4 mt-4">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div>
          <h4 className="text-sm font-medium">Admin Name</h4>
          <a href="#" className="text-red-500 text-sm hover:underline">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
