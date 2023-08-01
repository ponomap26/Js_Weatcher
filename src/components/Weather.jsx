import React, { useState } from "react";
import "../styles/Weather.css";



const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const API_key = "3484807aba14d9f8471d06a90f54c6c3";

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const getWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${API_key}&units=metric`
            );
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeatherData();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button className="weather-button " >Получить погоду на сегодня</button>
            </form>
            {weatherData && (
                <table className="weather-container" >

                    Город: {weatherData.name}
                    <br />
                    Температура: {weatherData.main.temp}°C
                    <br />
                    Температура по ощущениям: {weatherData.main.feels_like}°C
                    <br />
                    Атмосферное давление: {weatherData.main.pressure*0.75} мм рт. ст
                    <br />
                    Описание: {weatherData.weather[0].description}
                    <br />
                    ветер: {weatherData.wind.speed} метр в секунду

                </table>
            )}
        </div>
    );
};

export default Weather