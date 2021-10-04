import React, { useState, useEffect } from 'react';
import "./style.css";
import WeatherCard from './WeatherCard';

const Temperature = () => {
    const [searchValue, setsearchValue] = useState('Dhaka');
    const [weatherInfo, setweatherInfo] = useState({});
    const getWeatherInfo = async () => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=da041c7d882fa970078dd3093172e7d8`
            const res = await fetch(apiUrl);
            const data = await res.json(res);

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset, sunrise } = data.sys;
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
                sunrise,
            };
            setweatherInfo(myNewWeatherInfo);
            console.log({ myNewWeatherInfo });

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherInfo();
    }, [])
    return (
        <>
            {/* <div className="wrap" style={{paddingBottom:"20px"}}> */}
            <h2 className="title">Weather App</h2>
            <div className="search">
                <input
                    type="search"
                    placeholder="search..."
                    autoFocus
                    id="search"
                    className="searchTerm"
                    value={searchValue}
                    onChange={(e) => setsearchValue(e.target.value)}
                />
                <button
                    className="searchButton"
                    type="button"
                    onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
            {/* </div> */}
            <div style={{marginBottom: "80px"}}>
                <WeatherCard {...weatherInfo} />
            </div>
        </>
    )
}
export default Temperature;
