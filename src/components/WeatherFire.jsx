import React, { useState, useEffect } from "react";
import "../styles/WeatherFire.css";

const WeatherFire = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [todayWeatherData, setTodayWeatherData] = useState(null);
    const API_KEY = "3484807aba14d9f8471d06a90f54c6c3";

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const getWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            const filteredData = data.list.filter(
                (item) => new Date(item.dt_txt).getHours() === 18
            );
            setWeatherData(filteredData);
            setTodayWeatherData(filteredData[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeatherData();
    };



    useEffect(() => {
        if (weatherData) {
            console.log(weatherData);
        }
    }, [weatherData]);

    return (
        <main className="grid-wrapper">

            <div className="grid-item">
                <form onSubmit={handleSubmit}>
                    <label className="weather-input">
                        Введите город:
                        <input type="text" value={city} onChange={handleCityChange} />
                    </label>

                    <button className="weather-button" onClick={todayWeatherData}>
                        Получить данные о погоде в {city}
                    </button>
                </form>

                {todayWeatherData && (
                    <div className="weather-container">
                        Погода на сегодня
                        <br />
                        Город: {city}
                        <br />
                        Температура: {todayWeatherData.main.temp}°C
                        <br />
                        Температура по ощущениям: {todayWeatherData.main.feels_like}°C
                        <br />
                        Атмосферное давление: {todayWeatherData.main.pressure * 0.75} мм рт. ст
                        <br />
                        Описание: {todayWeatherData.weather[0].description}
                        <br />
                        Ветер: {todayWeatherData.wind.speed} метр в секунду
                    </div>
                )}

                {weatherData && (
                    <div>
                        <h2 className="progress-bar">Прогноз погоды на 5 дней</h2>
                        {weatherData.map((item) => (
                            <div className="weatherFive-container" key={item.dt}>
                                <p>Дата: {new Date(item.dt_txt).toLocaleDateString()}</p>
                                <p>Время: {new Date(item.dt_txt).toLocaleTimeString()}</p>
                                <p>Температура: {item.main.temp}°C</p>
                                <p>Описание: {item.weather[0].description}</p>
                                <p>Ветер: {item.wind.speed} метр в секунду</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default WeatherFire;