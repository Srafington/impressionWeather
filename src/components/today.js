import React from "react";
import dateService from "../services/date";


const Today = props => {
  const weather = props.current?.weather;
  const day = dateService.getDay(props.current.dt * 1000);
  let icon;
  let image;
  const temp = Math.round(props.current.main?.temp);
  let description = '';
  if (weather) {
    image = `https://openweathermap.org/img/wn/${weather[0]?.icon}@4x.png`;
    icon = <img src={image} alt=""></img>;
    description = weather[0].description;
  } else {
    icon = <i className="fas fa-circle-question"></i>;
  }
  return (
    <div className="today">
      <div>
        <h1>
          {day} ({temp}°C)
        </h1>
        <h5>
          {description}
        </h5>
      </div>
      <div>
        {icon}
      </div>
    </div>
  )
}

export default Today;
