import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Overview: React.FC = () => {
  const chartRefs = {
    ageDistributionChart: null as Chart | null,
    genderRatiosChart: null as Chart | null,
    populationChart: null as Chart | null,
  };

  useEffect(() => {
    // Define initMap globally
    (window as any).initMap = () => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 31.9686, lng: 35.2433 },
        zoom: 8,
      });

      new google.maps.Marker({
        position: { lat: 31.4086, lng: 34.3433 },
        map,
        title: "Main Location",
      });
    };

    // Load Google Maps API
    const loadGoogleMapsAPI = () => {
      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAysQBM3-leTK8l9EKH9GpzS5HeIplJeUM&callback=initMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadGoogleMapsAPI();

    // Initialize Charts
    const initializeCharts = () => {
      const ageData = {
        labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
        datasets: [
          {
            label: "Age Distribution",
            data: [20, 35, 25, 15, 5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      };

      const genderData = {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender Ratios",
            data: [60, 40],
            backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
          },
        ],
      };

      const populationData = {
        labels: ["Jabalia", "Beit Lahia", "Quds", "Shejaiya", "Hebron", "Nablus", "Ramallah", "Beit Jala"],
        datasets: [
          {
            label: "Population",
            data: [100000, 120000, 80000, 90000, 150000, 140000, 130000, 110000],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      if (chartRefs.ageDistributionChart) chartRefs.ageDistributionChart.destroy();
      if (chartRefs.genderRatiosChart) chartRefs.genderRatiosChart.destroy();
      if (chartRefs.populationChart) chartRefs.populationChart.destroy();

      chartRefs.ageDistributionChart = new Chart(
        document.getElementById("ageDistributionChart") as HTMLCanvasElement,
        {
          type: "pie",
          data: ageData,
          options: { responsive: true, maintainAspectRatio: false },
        }
      );

      chartRefs.genderRatiosChart = new Chart(
        document.getElementById("genderRatiosChart") as HTMLCanvasElement,
        {
          type: "pie",
          data: genderData,
          options: { responsive: true, maintainAspectRatio: false },
        }
      );

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
    };

    initializeCharts();

    return () => {
      if (chartRefs.ageDistributionChart) chartRefs.ageDistributionChart.destroy();
      if (chartRefs.genderRatiosChart) chartRefs.genderRatiosChart.destroy();
      if (chartRefs.populationChart) chartRefs.populationChart.destroy();
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Overview</h1>

      {/* Map Section */}
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-bold text-white mb-2 text-center">Map</h2>
        <div id="map" className="h-96 bg-gray-600 rounded-lg"></div>
      </div>

      {/* Charts Section */}
      <div className="flex justify-between items-start space-x-4 mb-6">
        {/* Age Distribution */}
        <div className="bg-gray-700 p-4 rounded-lg flex-1">
          <h2 className="text-lg font-bold text-white mb-2 text-center">Age Distribution</h2>
          <div className="chart-container">
            <canvas id="ageDistributionChart"></canvas>
          </div>
        </div>
        {/* Gender Ratios */}
        <div className="bg-gray-700 p-4 rounded-lg flex-1">
          <h2 className="text-lg font-bold text-white mb-2 text-center">Gender Ratios</h2>
          <div className="chart-container">
            <canvas id="genderRatiosChart"></canvas>
          </div>
        </div>
      </div>

      {/* Population Chart */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-white mb-2 text-center">Population Growth</h2>
        <div className="chart-container h-72">
          <canvas id="populationChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Overview;