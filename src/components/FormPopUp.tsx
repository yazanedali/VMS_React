import InputForm from "./InputForm";
import { inputName } from "../data/InputName";
import { view } from "../data/InputName";
import { inputAddDemog } from "../data/InputName";
interface IProps {
  toggleModal: () => void;
  action: string;
}

const FormPopUp = ({ toggleModal, action }: IProps) => {
  return (
    <div>
      <div
        id="authentication-modal"
        className=" fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full  bg-black bg-opacity-50"
      >
        <div className="relative p-2 w-full max-w-md  rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {action === "add"
                ? "Add Village"
                : action === "Update"
                ? "Update Village"
                : action === "Update Demographic Data"
                ? "Add Demographic Data for Jabalia"
                : action === "View"
                ? "Village Details"
                : ""}
            </h3>
            <button
              onClick={toggleModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-6flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <div className="text-2xl">x</div>
            </button>
          </div>
          <div className="p-4">
            {action === "add" ? (
              Object.entries(inputName).map(([key, value], index) => (
                <InputForm key={index} id={key} label={value} />
              ))
            ) : action === "Update" ? (
              Object.entries(inputName).map(([key, value], index) => (
                <InputForm key={index} id={key} label={value} />
              ))
            ) : action === "View" ? (
              Object.entries(view).map(([Key, value]) => (
                <div key={Key}>{value}</div>
              ))
            ) : action === "Update Demographic Data" ? (
              Object.entries(inputAddDemog).map(([key, value], index) => (
                <InputForm key={index} id={key} label={value} />
              ))
            ) : action === "Delete" ? (
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this village?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={toggleModal}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            ) : (
              ""
            )}

            <button
              onClick={() => {
                if (action === "add") {
                  // handleAdd();
                } else if (action === "Update") {
                  // handleUpdate();
                } else if (action === "Update Demographic Data") {
                  // handleUpdateDemographicData();
                } else {
                  console.log("No action selected");
                }
              }}
              className={`${
                action === "View" || action === "Delete"
                  ? "hidden"
                  : "w-full h-6block text-white bg-slate-500 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-500 dark:hover:bg-slate-600"
              }`}
            >
              {action === "add"
                ? "Add Village"
                : action === "Update"
                ? "Update Village"
                : action === "Update Demographic Data"
                ? "Add Demographic Data"
                : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPopUp;
