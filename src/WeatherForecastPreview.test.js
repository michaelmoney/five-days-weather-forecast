import React from 'react';
import WeatherForecastPreview from './WeatherForecastPreview';
import * as axios from 'axios';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter(), });
jest.mock('axios');

describe('When components is initialized', () => {
    let wrapper;
    let component;
    let prepareForecast;
    let fetchWeather;
    let displayForecastBox;
    beforeEach(() => {
        axios.mockImplementation(() => {
            return Promise.resolve({ data: { list: [], }, });
        });
        prepareForecast = jest.spyOn(WeatherForecastPreview.prototype, 'prepareView');
        fetchWeather = jest.spyOn(WeatherForecastPreview.prototype, 'fetchWeatherForecast');
        displayForecastBox = jest.spyOn(WeatherForecastPreview.prototype, 'displayForecastBox');
        wrapper = shallow(<WeatherForecastPreview/>);
        component = wrapper.instance();
    });

    it('should have default state defined', () => {
        expect(component.state).toEqual({ forecast: [], city: WeatherForecastPreview.DEFAULT_CITY, });
    });
    it('should call prepareView method', () => {
        expect(prepareForecast).toHaveBeenCalled();
    });
    it('should call fetchWeatherForecast method', () => {
        expect(fetchWeather).toHaveBeenCalled();
    });
});



