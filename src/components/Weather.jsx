import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search2.png";
import humidity_icon from "../assets/humidity2.png";
import wind_icon from "../assets/wind2.png";
import clear_icon from "../assets/clear2.png";
import drizzle_icon from "../assets/drizzle.png";
import cloud_icon from "../assets/cloud.png";
import cloudNight_icon from "../assets/cloudNight.png";
import rain_icon from "../assets/rain.png";
import rainNight_icon from "../assets/rainNight.png";
import snow_icon from "../assets/snow.png";
import mist_icon from "../assets/mist.png";
import thunderstorm_icon from "../assets/LightningBolt.png";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloudNight_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rainNight_icon,
    "10d": rain_icon,
    "10n": rainNight_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter the city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperate: Math.floor(data.main.temp),
        location: data.name,
        icons: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Failed to fetch weather data", error);
    }
  };
  useEffect(() => {
    search(inputRef);
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
  ref={inputRef}
  type="text"
  placeholder="Search"
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  }}
/>
        <img
          src={search_icon}
          onClick={() => search(inputRef.current.value)}
          alt=""
        ></img>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icons} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperate}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt=""></img>
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt=""></img>
              <div>
                <p>{weatherData.wind}km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
