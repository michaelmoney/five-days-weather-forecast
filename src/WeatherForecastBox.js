import React, { Component } from 'react';
import './WeatherForecastBox.css';

class WeatherForecastBox extends Component {
    render() {
        const {
            temp,
            pressure,
            humidity,
            weather,
            imgUrl,
            date,
        } = this.props.config;
        return (
            <div className="box-body">
                <div className='weather-date-section'>
                    <div className='weather-day'>{date.dayOfWeek}</div>
                    <div className='weather-month'>{`${date.month}, ${date.dayOfMonth}`}</div>
                </div>
                <div className='weather-main'>{weather.length && weather[0].main}</div>
                <div className='weather-temp-section'>
                    <img src={`${imgUrl}`} alt='weather-icon'/>
                    <div className='temperature'><span className='max'>{Math.round(temp.max)}&deg;C</span><span className='min'>/{Math.round(temp.min)}&deg;C</span> </div>
                </div>
                <div className='weather-details'>
                    <div>Pressure: {pressure}</div>
                    <div>Humidity: {humidity}</div>
                    <div>{weather.length && weather[0].description}</div>
                </div>
            </div>
        );
    }
}

export default WeatherForecastBox;