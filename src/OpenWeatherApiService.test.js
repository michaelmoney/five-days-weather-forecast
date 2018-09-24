import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OpenWeatherApiService from './OpenWeatherApiService';
import * as axios from 'axios';
import WeatherForecastPreview from './WeatherForecastPreview';

Enzyme.configure({ adapter: new Adapter(), });
jest.mock('axios');

let testedService;

describe('OpenWeatherApiService', () => {

    beforeEach(() => {
        axios.mockImplementation(() => {
            return Promise.resolve({ data: { list: [], }, });
        });
        testedService = new OpenWeatherApiService();
    });

    describe('when fetchWeatherForecast method is called', () => {
        it('should call make http request with specific payload', () => {
            // Given
            const expectedPayload = {
                method: 'get',
                url: OpenWeatherApiService.config.baseUrl,
                params: {
                    q: WeatherForecastPreview.DEFAULT_CITY,
                    mode: OpenWeatherApiService.config.mode,
                    units: OpenWeatherApiService.config.units,
                    cnt: OpenWeatherApiService.config.cnt,
                    APPID: OpenWeatherApiService.config.APPID,
                },
            };

            // When
            testedService.fetchWeatherForecast(WeatherForecastPreview.DEFAULT_CITY);

            // Then
            expect(axios).toHaveBeenCalledTimes(1);
            expect(axios).toHaveBeenCalledWith(expectedPayload);
        });
    });


});