export type Weather = {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  high: number;
  low: number;
};

type GeocodingResponse = {
  results?: Array<{ name: string; country?: string; latitude: number; longitude: number }>;
};

type ForecastResponse = {
  current: { temperature_2m: number; apparent_temperature: number; relative_humidity_2m: number; wind_speed_10m: number; weather_code: number };
  daily: { temperature_2m_max: number[]; temperature_2m_min: number[] };
};

export async function getWeather(cityQuery: string): Promise<Weather> {
  const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=1&language=vi&format=json`;
  const cityResponse = await fetch(cityUrl);
  if (!cityResponse.ok) throw new Error('Không tìm được địa điểm. Vui lòng thử lại.');
  const geocoding = await cityResponse.json() as GeocodingResponse;
  const place = geocoding.results?.[0];
  if (!place) throw new Error('Không tìm thấy thành phố này. Hãy kiểm tra tên và thử lại.');

  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '1',
  });
  const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!forecastResponse.ok) throw new Error('Chưa tải được dữ liệu thời tiết. Vui lòng thử lại.');
  const forecast = await forecastResponse.json() as ForecastResponse;

  return {
    city: place.name,
    country: place.country ?? '',
    temperature: forecast.current.temperature_2m,
    feelsLike: forecast.current.apparent_temperature,
    humidity: forecast.current.relative_humidity_2m,
    windSpeed: forecast.current.wind_speed_10m,
    weatherCode: forecast.current.weather_code,
    high: forecast.daily.temperature_2m_max[0],
    low: forecast.daily.temperature_2m_min[0],
  };
}

export function describeWeather(code: number): { icon: string; label: string } {
  if (code === 0) return { icon: '☀️', label: 'Trời quang' };
  if (code <= 2) return { icon: '🌤️', label: 'Ít mây' };
  if (code === 3) return { icon: '☁️', label: 'Nhiều mây' };
  if (code === 45 || code === 48) return { icon: '🌫️', label: 'Có sương mù' };
  if (code <= 57) return { icon: '🌦️', label: 'Mưa phùn' };
  if (code <= 67 || (code >= 80 && code <= 82)) return { icon: '🌧️', label: 'Có mưa' };
  if (code <= 77) return { icon: '❄️', label: 'Có tuyết' };
  if (code >= 95) return { icon: '⛈️', label: 'Dông' };
  return { icon: '🌥️', label: 'Thời tiết thay đổi' };
}
