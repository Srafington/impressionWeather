import env from "react-dotenv";

class weatherService {

  static apiKey = env.OPENWEATHER_API_KEY;
  static async setGeoLocation(city = env.CITY, country = env.COUNTRY) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${this.apiKey}`;
    try {
      const geoRes = await fetch(geoUrl, { crossDomain: true });
      const geoData = (await geoRes.json())[0];
      sessionStorage.setItem('geolocation', JSON.stringify(geoData));
      return geoData;
    } catch (e) {
      console.log(e);
      sessionStorage.removeItem('geolocation');
    }
    return null;
  }

  static async getForecast() {
    let forecast
    try {
      forecast = JSON.parse(await sessionStorage.getItem("forecast"));
    } catch (e) {
      console.log(e);
    }
    if (forecast && (forecast.dt + 900000) > Date.now()) { //every 15 minutes
      return forecast;
    } else {
      const geoData = await this.getGeoData();
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${geoData.lat}&lon=${geoData.lon}&appid=${this.apiKey}`;
        const response = await fetch(url, { crossDomain: true });
        const data = await response.json();
        data.dt = Date.now()
        sessionStorage.setItem("forecast", JSON.stringify(data));
        return data;
      } catch (e) {
        console.log(e);
      }
    }
  }

  static async getCurrentWeather() {
    const currentWeather = JSON.parse(sessionStorage.getItem("currentWeather"));
    if (currentWeather && (currentWeather.dt + 900) * 1000 < Date.now()) { //every 15 minutes
      return currentWeather;
    } else {
      const geoData = await this.getGeoData();
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${geoData.lat}&lon=${geoData.lon}&appid=${this.apiKey}`;
        const response = await fetch(url, { crossDomain: true });
        const data = await response.json();
        sessionStorage.setItem("currentWeather", JSON.stringify(data));
        return data;
      } catch (e) {
        console.log(e)
      }
    }
  }

  static collapseForecast(forecast) {
    const collapsedForecast = [];
    const today = new Date();
    if (forecast && forecast.list) {
      let day = forecast.list[0];
      forecast.list.forEach(slice => {
        const sliceDay = new Date(slice.dt * 1000);
        const prevSliceDay = new Date(day.dt * 1000);
        if (sliceDay.getDay() !== today.getDay()) {
          if (sliceDay.getDay() !== prevSliceDay.getDay()) {
            collapsedForecast.push(day);//may need lodash to deep copy
            day = slice;
          } else if (slice.main.temp > day.main.temp) {
            day = slice;
          }
        }
      });
      collapsedForecast.push(day); // Add final max found
      collapsedForecast.shift(); // remove first element which will be on the same day as "today"
    }
    return collapsedForecast;
  }

  static async getGeoData() {
    let geoData;
    try {
      geoData = JSON.parse(sessionStorage.getItem('geolocation'));
    } catch (e) {
      console.log(e);
    }
    if (!geoData) {
      geoData = await this.setGeoLocation();
    }
    return geoData;
  }

}

export default weatherService;
