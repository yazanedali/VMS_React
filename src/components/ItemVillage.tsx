import { useState } from "react";
import { buttonData } from "../data/buttonData";
import FormPopUp from "./FormPopUp";

interface IProps {
  NameVillage: string;
  idVillage: string;
}

const ItemVillage = ({ NameVillage, idVillage }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>("");
  const role = localStorage.getItem('role')


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="mt-4">
        <div className="bg-gray-700 rounded-md p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="text-white">{NameVillage}</p>
          <div className="bg-gray-700 rounded-md p-1 flex flex-col lg:flex-row lg:items-center ">
          {role === 'admin' ? (
  Object.entries(buttonData).map(([key, data]) => (
    <button
      key={key}
      onClick={() => {
        setCurrentAction(data.action);
        toggleModal();
      }}
      className="bg-slate-500 hover:bg-slate-800 text-white px-2 py-2 rounded-md focus:outline-none ml-3 sm:mb-2"
    >
      {data.action}
    </button>
  ))
) : (
  <button
    onClick={() => {
      setCurrentAction(buttonData.btn1.action);
      toggleModal();
    }}
    className="bg-slate-500 hover:bg-slate-800 text-white px-2 py-2 rounded-md focus:outline-none ml-3 sm:mb-2"
  >
    {buttonData.btn1.action}
  </button>
)} 
          </div>
        </div>
      </div>

      {isOpen && (
        <FormPopUp
          toggleModal={toggleModal}
          action={currentAction}
          idVillage={idVillage}
        />
      )}
    </div>
  );
};

export default ItemVillage;