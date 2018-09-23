import React, { Component } from 'react';
import WeatherForecastBox from './WeatherForecastBox';
import './WeatherForecastPreview.css';
import OpenWeatherApiService from './OpenWeatherApiService';
import { getDateFromUnixTimeStamp, getIconByCode } from './utils';

class WeatherForecastPreview extends Component {
    static ENTER_KEY = 13;
    static DEFAULT_CITY = 'Warsaw';

    constructor() {
        super();
        this.prepareView = this.prepareView.bind(this);
        this.displayForecastBox = this.displayForecastBox.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.fetchWeatherForecast = this.fetchWeatherForecast.bind(this);
        this.state = {
            forecast: [],
            city: WeatherForecastPreview.DEFAULT_CITY,
        };
        this.openWeatherApiService = new OpenWeatherApiService();
    }

    componentDidMount() {
        this.prepareView();
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='container-fluid'>
                    <nav className="navbar navbar-light bg-light">
                        <h1>Five days weather forecast</h1>
                    </nav>
                    <nav className="navbar navbar-light bg-light">
                        <h6 className='w-100'>Enter a city name:</h6>
                        <input
                            className="form-control col-12"
                            type='search'
                            placeholder='Enter city name'
                            value={this.state.city}
                            onChange={this.onInputChange}
                            onKeyUp={this.onInputChange}
                        />
                        <button type='submit' className='btn btn-success col-xs-12 col-md-6 col-lg-6' onClick={this.prepareView}>Check weather
                        </button>
                    </nav>
                    {!this.state.forecast.length && <div className="alert alert-danger" role="alert">City not found. Please search again.</div>}
                    {!!this.state.forecast.length && <h6>Selected city: <span className="badge badge-primary">{this.state.city}</span></h6>}
                    <div className='row justify-content-md-between justify-content-lg-start'>
                        {this.state.forecast}
                    </div>
                </div>
            </div>

        );
    }

    onInputChange(event) {
        const value = event.target.value;
        if (event.keyCode === WeatherForecastPreview.ENTER_KEY) {
            event.preventDefault();
            this.setState({
                city: value,
            });
            this.prepareView();
        } else {
            this.setState({
                city: value,
            });
        }
    }

    fetchWeatherForecast () {
        return this.openWeatherApiService.fetchWeatherForecast(this.state.city);
    }

    displayForecastBox ({ dt, temp, pressure, humidity, weather, }) {
        const date = getDateFromUnixTimeStamp(dt);
        const config = {
            temp,
            pressure,
            humidity,
            weather,
            date,
            imgUrl: `${OpenWeatherApiService.config.imgUrl}${getIconByCode(weather[0].id)}.png`,
        };
        return (
            <WeatherForecastBox config={config} />
        );
    }

    prepareView () {
        return this.fetchWeatherForecast()
            .then(response => {
                const forecastHTML = response.data.list.map((forecast, index) => {
                    return (<div className="box col-sm-12 col-md-5 col-lg-4" key={index}>{this.displayForecastBox(forecast)}</div>);
                });
                this.setState({ forecast: forecastHTML, });
            })
            .catch(error => {
                const errorStatus = error.response && error.response.status;
                if (errorStatus === 404 || errorStatus === 400)  {
                    this.setState({
                        forecast: [],
                        city: '',
                    });
                }
            });
    }
}

export default WeatherForecastPreview;
