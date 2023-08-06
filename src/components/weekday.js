import React from "react";
import dateService from "../services/date";

const Weekday = props => {
  const weather = props.forecast?.weather;
  const day = dateService.getDay(props.forecast.dt * 1000);
  let icon;
  let image;
  const temp = Math.round(props.forecast.main?.temp);
  if (weather) {
    image = `https://openweathermap.org/img/wn/${props.forecast?.weather[0]?.icon}.png`;
    icon = <img src={image} alt=""></img>;
  } else {
    icon = <i className="fas fa-circle-question"></i>;
  }
  return (
    <div className="day">
      <div >
        {day}
        <br></br>
        {temp}°C
      </div>
      <div>
        {icon}
      </div>
    </div>
  )
}

export default Weekday;
