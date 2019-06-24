import axios from 'axios';

class OpenWeatherApiService  {
    static config = {
        baseUrl: 'https://api.openweathermap.org/data/2.5/forecast/daily',
        mode: 'json',
        units: 'metric',
        cnt: 5,
        APPID: '6618cb01c3501a12296501fb525edd96',
        imgUrl: 'http://openweathermap.org/img/w/',
    };

    fetchWeatherForecast(city) {
        return axios({
            method: 'get',
            url: OpenWeatherApiService.config.baseUrl,
            params: {
                q: city,
                mode: OpenWeatherApiService.config.mode,
                units: OpenWeatherApiService.config.units,
                cnt: OpenWeatherApiService.config.cnt,
                APPID: OpenWeatherApiService.config.APPID,
            },
        });
    }
}

export default OpenWeatherApiService;