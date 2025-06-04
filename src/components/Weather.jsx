import { useState } from "react";
import search_icon from "../assets/search.svg";
import snow_icon from "../assets/snow.svg";
import clear_icon from "../assets/clear.svg";
import cloud_icon from "../assets/cloud.svg";
import rain_icon from "../assets/rain.svg";
import "./Weather.css";
import { useEffect } from "react";
import { useRef } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [enteredText, setEnteredText] = useState("");
  const [time, setTime] = useState(new Date());

  const refSearch = useRef();
  const iconData = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city == "") {
      alert("Please enter a city");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      //   console.log(data);
      //   console.log(data.cod);
      if (data.cod == "404") {
        alert("Please enter a correct city name");
        setEnteredText("");
      }
      const icon = iconData[data.weather[0].icon];
      setWeatherData({
        location: data.name,
        temperature: data.main.temp,
        weather: data.weather[0].main,
        icon: icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (error) {
      console.log(error);
    }
    if (weatherData.location == "") {
      alert("City not found");
    }
    setEnteredText("");
  };

  useEffect(() => {
    search("Biratnagar");
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  return (
    // <div className="flex">
    <div className="flex flex-col gap-3 p-3 ">
      {/* search box  */}
      <div className="flex bg-gradient-to-br from-sky-600 to-purple-600 p-4 rounded-lg gap-3 shadow-sm shadow-black">
        <input
          type="text"
          placeholder="Enter city "
          value={enteredText}
          onChange={(e) => setEnteredText(e.target.value)}
          ref={refSearch}
          className="border border-sky-100 p-1 w-full"
        />
        <img
          src={search_icon}
          className="self-center w-7 cursor-pointer "
          onClick={() => search(refSearch.current.value)}
        />
      </div>

      {/* display box  */}
      <div className="bg-gradient-to-br from-sky-600 to-purple-600 flex flex-col p-6 rounded-lg shadow-sm shadow-black  ">
        <p className="self-center mt-5 text-5xl font-bold">
          {weatherData.location}
        </p>
        {/* for location and time */}
        <div className="flex flex-col mt-6">
          <p>🗺️ {weatherData.location}</p>
          <p>
            🗓️ {time.toLocaleTimeString()} || {time.toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-around mt-3 gap-15">
          <div className="flex flex-col">
            <p className="text-8xl m-4 font-bold">
              {Math.floor(weatherData.temperature)}°C
            </p>
            <p className="text-2xl font-bold">{weatherData.weather}</p>
            <p className="font-light">Humidity {weatherData.humidity}%</p>
            <p className="font-light">Wind Speed {weatherData.windSpeed}km/h</p>
          </div>
          <img src={weatherData.icon} className=" self-start w-30" />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Weather;
