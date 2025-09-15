import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

/**
 * 
 * @description This is the weather card for the cashier side
 * @returns {JSX Element}
 * @author Garry Peter Thompson
 */

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Get your API key from https://www.weatherapi.com/
                const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
                const city = 'College Station';
                
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
                );

                setWeather(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch weather data');
                setLoading(false);
                console.error('Weather API Error:', err);
            }
        };

        fetchWeather();
        // Refresh weather data every 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="weather-loading">Loading weather...</div>;
    if (error) return <div className="weather-error">{error}</div>;
    if (!weather) return <div className="weather-error">No weather data available</div>;

    return (
        <div className="weather-container">
            <h2 className="weather-title">Weather in {weather.location.name}</h2>
            <div className="weather-info">
                <div className="weather-main">
                    <img 
                        src={weather.current.condition.icon} 
                        alt={weather.current.condition.text}
                        className="weather-icon"
                    />
                    <p className="weather-temp">{weather.current.temp_c}°C</p>
                </div>
                <p className="weather-condition">{weather.current.condition.text}</p>
            </div>
        </div>
    );
};

export default Weather; 