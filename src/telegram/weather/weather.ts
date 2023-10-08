import axios from 'axios';

const API_KEY = '158e2ceb3bdde594df7abc08be25c00e';

interface WeatherData {
  data: string;
  status: number;
}

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    console.log(res);

    const data = res.data;

    if (data.cod === 200) {
      const status = 200;

      const weather = `The temperature in ${data.name} is ${data.main.temp}°C with ${data.weather[0].main}, Wind is blowing at a speed of ${data.wind.speed} km/h and humidity is ${data.main.humidity}.`;
      return {
        status: 200,
        data: weather,
      };
    } else {
      return {
        status: 400,
        data: 'City not found',
      };
    }
  } catch (err) {
    console.log(err.response.data);
    return {
      status: 400,
      data: 'City not found',
    };
  }
};
