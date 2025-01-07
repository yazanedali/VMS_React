import React, { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Overview: React.FC = () => {
  const chartRefs = {
    ageDistributionChart: null as Chart | null,
    genderRatiosChart: null as Chart | null,
    populationChart: null as Chart | null,
  };
  const [totalNumberOfVillages, setTotalNumberOfVillages] = useState<
    number | null
  >(null);
  const [totalNumberOfUrbanAreas, setTotalNumberOfUrbanAreas] = useState<
    number | null
  >(null);
  const [totalPopulationSize, setTotalPopulationSize] = useState<number | null>(
    null
  );
  const [averageLandArea, setAverageLandArea] = useState<number | null>(null);

  const fetchData = async (
    query: string,
    setState: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    try {
      const response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error("Error fetching data:", result.errors);
      } else {
        setState(result.data[Object.keys(result.data)[0]]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(`query { totalNumberOfVillages }`, setTotalNumberOfVillages);
    fetchData(`query { totalNumberOfUrbanAreas }`, setTotalNumberOfUrbanAreas);
    fetchData(`query { totalPopulationSize }`, setTotalPopulationSize);
    fetchData(`query { averageLandArea }`, setAverageLandArea);
  }, []);

  useEffect(() => {
    const initMap = async () => {
      const query = `
        query {
          getVillages {
            latitude
            longitude
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
          console.error("GraphQL errors:", result.errors);
          return;
        }

        const villages = result.data.getVillages;

        const mapElement = document.getElementById("map");
        if (!mapElement) {
          console.error("Map element not found!");
          return;
        }

        const existingMap = mapElement?.children[0];
        if (existingMap) existingMap.remove();

        const map = new google.maps.Map(mapElement, {
          center: { lat: 31.9686, lng: 35.2433 },
          zoom: 8,
        });

        villages.forEach((village: { latitude: any; longitude: any }) => {
          const { latitude, longitude } = village;
          new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map,
            title: "Village Location",
          });
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const loadGoogleMapsAPI = () => {
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAysQBM3-leTK8l9EKH9GpzS5HeIplJeUM";
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    loadGoogleMapsAPI();

    const initializeCharts = async () => {
      let genderData = null;
      let ageData = null;

      const genderRatios = async () => {
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
                    genderRatios
                  }
                }
              `,
            }),
          });

          const result = await response.json();
          if (result.data && result.data.getVillages) {
            const genderRatios = result.data.getVillages.map(
              (village: { genderRatios: string }) => village.genderRatios
            );

            let totalMale = 0;
            let totalFemale = 0;

            genderRatios.forEach((ratio: string) => {
              const matches = ratio.match(/Male: (\d+)%.*Female: (\d+)%/);
              if (matches) {
                const male = parseInt(matches[1], 10);
                const female = parseInt(matches[2], 10);
                totalMale += male;
                totalFemale += female;
              }
            });

            const total = totalMale + totalFemale;
            const malePercentage = parseFloat(
              ((totalMale / total) * 100).toFixed(2)
            );
            const femalePercentage = parseFloat(
              ((totalFemale / total) * 100).toFixed(2)
            );

            genderData = {
              labels: ["Male", "Female"],
              datasets: [
                {
                  label: "Gender Ratios",
                  data: [malePercentage, femalePercentage],
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                  ],
                },
              ],
            };

            console.log("Gender Data:", genderData);
          }
        } catch (error) {
          console.error("Error fetching gender data:", error);
        }
      };

      const ageDistribution = async () => {
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
                      ageDistribution
                    }
                  }
                `,
            }),
          });

          const result = await response.json();
          if (result.data && result.data.getVillages) {
            const ageDistributions = result.data.getVillages.map(
              (village: { ageDistribution: string }) => village.ageDistribution
            );
            let total_0_14 = 0;
            let total_15_64 = 0;
            let total_65_plus = 0;

            ageDistributions.forEach((ratio: string) => {
              const matches = ratio.match(
                /0-14: (\d+)%, 15-64: (\d+)%, 65\+: (\d+)%/
              );
              if (matches) {
                const zeroToFourteen = parseInt(matches[1], 10);
                const fifteenToSixtyFour = parseInt(matches[2], 10);
                const sixtyFivePlus = parseInt(matches[3], 10);
                total_0_14 += zeroToFourteen;
                total_15_64 += fifteenToSixtyFour;
                total_65_plus += sixtyFivePlus;
              }
            });
            const totalAges = total_0_14 + total_15_64 + total_65_plus;
            let zeroToFourteenPercentage = 0;
            let fifteenToSixtyFourPercentage = 0;
            let sixtyFivePlusPercentage = 0;
            if (totalAges > 0) {
              zeroToFourteenPercentage = parseFloat(
                ((total_0_14 / totalAges) * 100).toFixed(2)
              );
              fifteenToSixtyFourPercentage = parseFloat(
                ((total_15_64 / totalAges) * 100).toFixed(2)
              );
              sixtyFivePlusPercentage = parseFloat(
                ((total_65_plus / totalAges) * 100).toFixed(2)
              );
            }

            ageData = {
              labels: ["0-14", "15-64", "65+"],
              datasets: [
                {
                  label: "Age Distribution",
                  data: [
                    zeroToFourteenPercentage,
                    fifteenToSixtyFourPercentage,
                    sixtyFivePlusPercentage,
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                  ],
                },
              ],
            };
            console.log("Age Data:", ageData);
          }
        } catch (error) {
          console.error("Error fetching age data:", error);
        }
      };

      await Promise.all([genderRatios(), ageDistribution()]);

      if (chartRefs.ageDistributionChart) {
        chartRefs.ageDistributionChart.destroy();
      }
      if (chartRefs.genderRatiosChart) {
        chartRefs.genderRatiosChart.destroy();
      }

      if (ageData) {
        chartRefs.ageDistributionChart = new Chart(
          document.getElementById("ageDistributionChart") as HTMLCanvasElement,
          {
            type: "pie",
            data: ageData,
            options: { responsive: true, maintainAspectRatio: false },
          }
        );
      }

      if (genderData) {
        chartRefs.genderRatiosChart = new Chart(
          document.getElementById("genderRatiosChart") as HTMLCanvasElement,
          {
            type: "pie",
            data: genderData,
            options: { responsive: true, maintainAspectRatio: false },
          }
        );
      }

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
                    villageName
                    populationGrowthRate
                  }
                }
              `,
            }),
          });

          const result = await response.json();
          if (result.data && result.data.getVillages) {
            const labels = result.data.getVillages.map(
              (village: { villageName: string }) => village.villageName
            );
            const data = result.data.getVillages.map(
              (village: { populationGrowthRate: string }) =>
                parseFloat(village.populationGrowthRate)
            );

            const populationData = {
              labels,
              datasets: [
                {
                  label: "Population Growth Rate",
                  data,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            };

            if (chartRefs.populationChart) chartRefs.populationChart.destroy();

            chartRefs.populationChart = new Chart(
              document.getElementById("populationChart") as HTMLCanvasElement,
              {
                type: "bar",
                data: populationData,
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: { beginAtZero: true },
                  },
                },
              }
            );
          }
        } catch (error) {
          console.error("Error fetching villages:", error);
        }
      };

      fetchVillages();
    };

    initializeCharts();

    return () => {
      if (chartRefs.ageDistributionChart)
        chartRefs.ageDistributionChart.destroy();
      if (chartRefs.genderRatiosChart) chartRefs.genderRatiosChart.destroy();
      if (chartRefs.populationChart) chartRefs.populationChart.destroy();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Overview</h1>
  
      {/* Map Section */}
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold text-white mb-2">Map</h2>
        <div id="map" className="h-96 bg-gray-700 rounded-lg flex items-center justify-center text-white">
          Map Placeholder
        </div>
      </div>
  
      {/* Stats Section */}
      <div className="sm:grid-cols-2 grid lg:grid-cols-4 gap-6">
        {[{ title: 'Total Number of Villages', value: totalNumberOfVillages },
          { title: 'Total Number of Urban Areas', value: totalNumberOfUrbanAreas },
          { title: 'Total Population Size', value: totalPopulationSize },
          { title: 'Average Land Area', value: averageLandArea }]
          .map((stat, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-bold text-white text-center">
                {stat.title}
              </h2>
              <p className="text-3xl text-white mt-2 text-center">
                {stat.value}
              </p>
            </div>
          ))}
      </div>
  
      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-6 mt-6">
        {[{ title: 'Age Distribution', chartId: 'ageDistributionChart' },
          { title: 'Gender Ratios', chartId: 'genderRatiosChart' }]
          .map((chart, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-white">{chart.title}</h2>
              <div className="h-64 bg-gray-700 rounded-lg mt-4">
                <canvas id={chart.chartId}></canvas>
              </div>
            </div>
          ))}
      </div>
  
      {/* Population Growth Chart */}
      <div className="bg-gray-700 p-4 rounded-lg mt-6">
        <h2 className="text-lg font-bold text-white mb-2">Population Growth</h2>
        <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-white">
          <canvas id="populationChart"></canvas>
        </div>
      </div>
    </div>
  );
  
  
};

export default Overview;
