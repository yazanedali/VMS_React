import React from 'react';
import { Link } from 'react-router-dom';

type SidebarProps = {
  icon: string;
  label: string;
  to: string;
  onklick:()=>void

};

const SidebarLink: React.FC<SidebarProps> = ({ icon, label, to, onklick}) => {
  return (
    <Link    
    onClick={onklick}
      to={to}
      className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
    >
      <span className="text-xl">{icon}</span>
      {<span>{label}</span>}
    </Link>
  );
};

export default SidebarLink;