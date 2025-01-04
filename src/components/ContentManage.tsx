import { useEffect, useState } from "react";
import ItemVillage from "./ItemVillage";

interface IProps {}

const ContentManage = ({}: IProps) => {
  interface Prop {
    id: string;
    villageName: string;
    regionDistrict: string;
    landArea: string;
    latitude: string;
    longitude: string;
    urlmage: string;
  }

  const [villageData, setVillageData] = useState<Prop[]>([]);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                getVillages {
                  id
                  villageName
                  regionDistrict
                  landArea
                  latitude
                  longitude
                  urlmage
                }
              }
            `,
          }),
        });

        const result = await response.json();
        if (result.data && result.data.getVillages) {
          setVillageData(result.data.getVillages);
        }
      } catch (error) {
        console.error("Error fetching villages:", error);
      }
    };

    fetchVillages();
  }, [villageData]);

  return (
    <div className="mt-10">
      <div className="bg-gray-800 text-white p-4 rounded-md">
        <input
          type="text"
          placeholder="Search villages..."
          className="mb-10 bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex w-full"
        />
        <div className="flex flex-row justify-between items-center">
          <div className="relative">
            <div className="bg-gray-700 px-4 py-2 rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sort by:
              <div>
                <form className="max-w-sm mx-auto">
                  <select
                    id="countries"
                    defaultValue="dd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="dd">Default</option>
                    <option value="deyaa">Alphabetical</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              Prev
            </button>
            <button className="bg-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              Next
            </button>
          </div>
        </div>
        <div>
          {villageData.map((village, index) => (
            <ItemVillage
              key={index}
              NameVillage={village.villageName}
              idVillage={village.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManage;