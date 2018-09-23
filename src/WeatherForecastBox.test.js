import React from 'react';
import WeatherForecastBox from './WeatherForecastBox';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter(), });
jest.mock('axios');

describe('When a component is rendered inside DOM', () => {
    let component;
    const mockConfig = {
        dt: '1',
        temp: {
            min: 10,
            max: 30,
        },
        pressure: 100,
        humidity: 100,
        weather: [
            {
                id: '500',
                description: 'rain',
            },],
        imgUrl: 'url',
        date: {
            month: 'Sept',
            dayOfWeek: 'Monday',
            dayOfMonth: 21,
        },
    };

    beforeEach(() => {
        component = mount(<WeatherForecastBox config={mockConfig}/>);
    });

    afterEach(() => {
        component.unmount();
    });

    it('should display max temperature', () => {
        // Given
        const expectedTemperatureMax = mockConfig.temp.max;

        // When
        const componentTpl = component.html();

        // Then
        expect(componentTpl.includes(`${Math.round(expectedTemperatureMax)}`)).toBeTruthy();
    });

    it('should display min temperature', () => {
        // Given
        const expectedTemperatureMin = mockConfig.temp.min;

        // When
        const componentTpl = component.html();

        // Then
        expect(componentTpl.includes(`${Math.round(expectedTemperatureMin)}`)).toBeTruthy();
    });

    it('should display humidity', () => {
        // Given
        const expectedHumidity = mockConfig.humidity;

        // When
        const componentTpl = component.html();

        // Then
        expect(componentTpl.includes(`Humidity: ${expectedHumidity}`)).toBeTruthy();
    });
});