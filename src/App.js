import logo from './logo.svg';
import React, { useEffect } from "react";
import './App.css';

import Today from './components/today'
import Weekday from './components/weekday';
import weatherService from './services/weather';
import Sensors from './components/sensors';
import adafruitIoService from './services/adafruit-io';

function App() {
  const [forecast, setForecast] = React.useState(
    []
  );
  const [currentWeather, setCurrentWeather] = React.useState(
  );
  const [sensorData, setSensorData] = React.useState(
  );
  useEffect(() => {
    const fetchData = async () => {
      if (forecast.length < 1) {
        setForecast(
          weatherService.collapseForecast(
            await weatherService.getForecast()
          )
        );
      }
      if (!currentWeather) {
        setCurrentWeather(
          await weatherService.getCurrentWeather()
        );
      }
      if (!sensorData) {
        setSensorData(
          await adafruitIoService.getPM25Data()
        )
      }
    }
    fetchData();
  }, [forecast, currentWeather, sensorData]);
  if (forecast[0] && currentWeather && sensorData && sensorData.data.length > 0 ) {

    return (
      <div className="App">
        <section className="week">
          {
            forecast.map(day => <Weekday forecast={day} key={day.dt}></Weekday>)
          }
        </section>
        <section className="focus">
          <Today current={currentWeather}></Today>
          <div className="sensors">
            <Sensors sensordata={sensorData}></Sensors>
          </div>
        </section>

      </div>
    );
  } else {
    return (
      <div>
        <h1>
          Loading...
        </h1>
      </div>
    )
  }
}

export default App;
