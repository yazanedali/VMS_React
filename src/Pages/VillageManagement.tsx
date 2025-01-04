import React, { useState } from "react";
import ContentManage from "../components/ContentManage";
import FormPopUp from "../components/FormPopUp";

const VillageManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleModal}
          className=" block text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          type="button"
        >
          Add New Village
        </button>

        {isOpen && <FormPopUp toggleModal={toggleModal} action="add" />}
      </div>

      <ContentManage />
    </div>
  );
};

export default VillageManagement;