import InputForm from "./InputForm";
import { inputName } from "../data/InputName";
import { view } from "../data/InputName";
import { inputAddDemog } from "../data/InputName";
import { useEffect, useState } from "react";
interface IProps {
  toggleModal: () => void;
  action: string;
  idVillage?: string;
}

const FormPopUp = ({ toggleModal, action, idVillage }: IProps) => {
  useEffect(() => {
    if (action == "Update" || action == "View") {
      const fetchVillages = async () => {
        const query = `
      query {
         getVillage(id:"${idVillage}"){
         
         villageName
     	   regionDistrict
     	   landArea
   			 latitude
   			 longitude
   			 urlmage
         tags
        
        }
      }
          `;

        try {
          const response = await fetch("http://localhost:5000/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          const result = await response.json();
          if (result.errors) {
            console.log("Error:", result.errors[0].message);
          } else {
            setInputValue(result.data.getVillage);
            console.log(result.data.getVillage);
            console.log("data ", inputValue);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchVillages();
    } else if (action == "Update Demographic Data") {
      const fetchVillages = async () => {
        const query = `
      query {
         getDemographic(id:"${idVillage}"){
         
        populationSize
        ageDistribution
        genderRatios
        populationGrowthRate
              
        }
      }
          `;

        try {
          const response = await fetch("http://localhost:5000/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          const result = await response.json();
          if (result.errors) {
            console.log("Error:", result.errors[0].message);
          } else {
            setInputValue(result.data.getDemographic);
            console.log(result.data.getDemographic);
            console.log("data ", inputAddDemog);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchVillages();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  interface prop {
    villageName: string;
    regionDistrict: string;
    landArea: string;
    latitude: string;
    longitude: string;
    urlmage: string;
    tags: string;

    populationSize: string;
    ageDistribution: string;
    genderRatios: string;
    populationGrowthRate: string;
  }

  const [inputValue, setInputValue] = useState<prop>({
    villageName: "",
    regionDistrict: "",
    landArea: "",
    latitude: "",
    longitude: "",
    urlmage: "",
    tags: "",

    populationSize: "",
    ageDistribution: "",
    genderRatios: "",
    populationGrowthRate: "",
  });

  const handleAdd = async (e: React.FormEvent) => {
    console.log("first");
    e.preventDefault();

    const mutation = `
      mutation {
      addVillage(
      villageName:"${inputValue.villageName}",
      regionDistrict:"${inputValue.regionDistrict}",
      landArea:"$${inputValue.landArea}",
      latitude:"${inputValue.latitude}",
      longitude:"${inputValue.longitude}",
      urlmage:"${inputValue.urlmage}"
      tags:"${inputValue.tags}"
      ) {
         id
         villageName
     	   regionDistrict
     	   landArea
   			 latitude
   			 longitude
   			 urlmage
         tags
        
        }
      }
    `;

    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        console.log("error");
      } else {
        console.log(`sucsess:  ${JSON.stringify(result.data.addVillage)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    console.log(idVillage);
    e.preventDefault();

    const mutation = `
      mutation {
      villageUpdate(
      id:"${idVillage}"
      villageName:"${inputValue.villageName}",
      regionDistrict:"${inputValue.regionDistrict}",
      landArea:"$${inputValue.landArea}",
      latitude:"${inputValue.latitude}",
      longitude:"${inputValue.longitude}",
      urlmage:"${inputValue.urlmage}"
      tags:"${inputValue.tags}"

      ) 
      }
    `;

    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        console.log("error");
      } else {
        console.log(`${JSON.stringify(result.data.villageUpdate)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateDemographicData = async (e: React.FormEvent) => {
    console.log(idVillage);
    e.preventDefault();

    const mutation = `
      
    mutation {
      demographicUpdate (id:"${idVillage}",
       populationSize:"${inputValue.populationSize}",
      ageDistribution:"${inputValue.ageDistribution}",
      genderRatios:"${inputValue.genderRatios}",
      populationGrowthRate:"${inputValue.populationGrowthRate}")
         
  
        
      }
    `;

    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        console.log("error");
      } else {
        console.log(`${JSON.stringify(result.data.demographicUpdate)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    console.log(idVillage);
    e.preventDefault();

    const mutation = `
      
mutation {
     villageDelete (id:"${idVillage}")
      }
    `;

    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await response.json();
      if (result.errors) {
        console.log("error");
      } else {
        console.log(`${JSON.stringify(result.data.villageDelete)}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                <InputForm
                  key={index}
                  id={key}
                  label={value}
                  onChange={handleChange}
                  name={key}
                  value={inputValue[key as keyof prop]}
                />
              ))
            ) : action === "Update" ? (
              Object.entries(inputName).map(([key, value], index) => (
                <InputForm
                  key={index}
                  id={key}
                  label={value}
                  onChange={handleChange}
                  name={key}
                  value={inputValue[key as keyof prop]}
                />
              ))
            ) : action === "View" ? (
              Object.entries(view).map(([Key, value], index) => (
                <div key={index}>
                  <span>{value}: </span>
                  <span>{inputValue[Key as keyof prop]}</span>
                </div>
              ))
            ) : action === "Update Demographic Data" ? (
              Object.entries(inputAddDemog).map(([key, value], index) => (
                <InputForm
                  key={index}
                  id={key}
                  label={value}
                  onChange={handleChange}
                  name={key}
                  value={inputValue[key as keyof prop]}
                />
              ))
            ) : action === "Delete" ? (
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this village?
                </h3>
                <button
                  onClick={handleDelete}
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
              onClick={(e) => {
                if (action === "add") {
                  handleAdd(e);
                  toggleModal();
                  console.log("dataa");
                } else if (action === "Update") {
                  toggleModal();
                  handleUpdate(e);
                } else if (action === "Update Demographic Data") {
                  toggleModal();
                  handleUpdateDemographicData(e);
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
