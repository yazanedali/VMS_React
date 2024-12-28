
import React from "react";

interface OverviewProps {
  isSidebarOpen: boolean;
}

const Overview: React.FC<OverviewProps> = ({ isSidebarOpen }) => {
  return (
    <div style={{height: '100%'}}
      className={`transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="sm:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="col-span-2">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Map</h2>
            <div className="h-64 bg-gray-600 rounded-lg">Map Placeholder</div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <h2 className="text-lg font-bold">Total Number of Villages</h2>
          <p className="text-3xl mt-2">8</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <h2 className="text-lg font-bold">Total Number of Urban Areas</h2>
          <p className="text-3xl mt-2">3</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <h2 className="text-lg font-bold">Total Population Size</h2>
          <p className="text-3xl mt-2">660,000</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <h2 className="text-lg font-bold">Average Land Area</h2>
          <p className="text-3xl mt-2">11.88 sq km</p>
        </div>

        {/* Charts */}
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <h2 className="text-lg font-bold">Age Distribution</h2>
          <div className="h-40 bg-gray-600 rounded-lg">Age Chart Placeholder</div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg mt-2">
          <h2 className="text-lg font-bold">Gender Ratios</h2>
          <div className="h-40 bg-gray-600 rounded-lg mt-2">Gender Chart Placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
