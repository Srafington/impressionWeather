import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Sensors = props => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
  );


  let airQuality;
  let airQualityText;

  const currentAQ = props.sensordata.data.slice(-1)[0];
  switch (true) {
    case (currentAQ < 20): airQuality = "aq-good"; airQualityText = "Good"; break;
    case (currentAQ < 40): airQuality = "aq-good"; airQualityText = "Moderate"; break;
    case (currentAQ < 60): airQuality = "aq-poor"; airQualityText = "Poor"; break;
    case (currentAQ < 80): airQuality = "aq-danger"; airQualityText = "Bad"; break;
    default: airQuality = "aq-danger"; airQualityText = "Severe";
  }

  const data = {
    labels: props.sensordata.labels,
    datasets: [{
      label: 'PM2.5 Density',
      data: props.sensordata.data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3,
      pointRadius: 0
    }]
  };
  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'category',
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ticks: {
          autoSkip: true
        }
      }]
    }
  }


  return (
    <div>
      <div>
        <h1>
          Air Quality
        </h1>
        <h4>
          PM 2.5 Particle Count
        </h4>
        <Line data={data} options={chartOptions}></Line>
      </div>
      <div className="aq">
        <h4>
          Current Air Quality
        </h4>
        <span className={airQuality}>
          {airQualityText}
        </span>
      </div>
    </div>
  );
}

export default Sensors;
