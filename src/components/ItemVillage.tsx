import { useState } from "react";
import { buttonData } from "../data/buttonData";
import FormPopUp from "./FormPopUp";

interface IProps {
  NameVillage: string;
}

const ItemVillage = ({ NameVillage }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="mt-4">
        <div className="bg-gray-700 rounded-md p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="text-white">{NameVillage}</p>
          <div className="bg-gray-700 rounded-md p-1 flex flex-col lg:flex-row lg:items-center ">
            {Object.entries(buttonData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentAction(data.action);
                  toggleModal();
                }}
                className="bg-slate-500 hover:bg-slate-800 text-white px-2 py-2 rounded-md focus:outline-none ml-3 sm:mb-2 "
              >
                {data.action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && <FormPopUp toggleModal={toggleModal} action={currentAction} />}
    </div>
  );
};

export default ItemVillage;
