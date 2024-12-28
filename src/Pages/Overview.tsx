import React from 'react';

interface OverviewProps {
  isOpen: boolean;
}

const Overview: React.FC<OverviewProps> = ({ isOpen }) => {
  return (
    <div
      className={`h-full p-6 transition-all duration-300 ${
        isOpen ? 'ml-64' : 'ml-0'
      } md:ml-0 md:pl-6`}
    >
      <h1 className="text-2xl font-bold mb-6 text-white">Overview</h1>
      
      {/* Map Section */}
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold text-white mb-2">Map</h2>
        <div className="h-64 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300">
          Map Placeholder
        </div>
      </div>

      {/* Stats Section */}
      <div className="sm:grid-cols-2 grid lg:grid-cols-4  gap-6">
        {[
          { title: 'Total Number of Villages', value: '8' },
          { title: 'Total Number of Urban Areas', value: '3' },
          { title: 'Total Population Size', value: '660,000' },
          { title: 'Average Land Area', value: '11.88 sq km' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center"
          >
            <h2 className="text-lg font-bold text-white text-center">
              {stat.title}
            </h2>
            <p className="text-3xl text-gray-300 mt-2 text-center">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 mt-6">
        {[
          { title: 'Age Distribution', placeholder: 'Age Chart Placeholder' },
          { title: 'Gender Ratios', placeholder: 'Gender Chart Placeholder' },
        ].map((chart, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-white">{chart.title}</h2>
            <div className="h-64 bg-gray-600 rounded-lg mt-4 flex items-center justify-center text-gray-300">
              {chart.placeholder}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
