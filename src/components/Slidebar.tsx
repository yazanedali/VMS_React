import React from "react";
import SidebarLink from "./SliderLink";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white md:hidden fixed top-4 left-4 z-50"
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-6 transform flex flex-col ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-40`}
      >
        <h1 className="text-2xl font-bold mb-6 mt-6">Dashboard</h1>
        <ul className="space-y-4 flex-grow">
          <SidebarLink icon="🏠" label="Overview" to="/" />
          <SidebarLink icon="📋" label="Village Management" to="/village-management" />
          <SidebarLink icon="💬" label="Chat" to="/chat" />
          <SidebarLink icon="🖼️" label="Gallery" to="/gallery" />
        </ul>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
          <div>
            {(
              <>
                <h4 className="text-sm font-medium">Admin Name</h4>
                <a href="#" className="text-red-500 text-sm hover:underline">
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
