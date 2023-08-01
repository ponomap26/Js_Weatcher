import React, { useState, useEffect } from "react";

const WeatherToday = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const API_key = "3484807aba14d9f8471d06a90f54c6c3";

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&appid=${API_key}&units=metric`
                );
                const data = await response.json();
                const todayData = data.list[0];
                setWeatherData(todayData);
            } catch (error) {
                console.log(error);
            }
        };

        getWeatherData();
    }, [city]);

    return (
        <div>
            {weatherData && (
                <div>
                    <h2>Погода сегодня для {city}</h2>
                    <p>Дата: {new Date(weatherData.dt_txt).toLocaleDateString()}</p>
                    <p>Время: {new Date(weatherData.dt_txt).toLocaleTimeString()}</p>
                    <p>Температура: {weatherData.main.temp}°C</p>
                    <p>Описание: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherToday