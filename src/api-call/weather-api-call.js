export const getWeather = async (city) => {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  } else {
    const data = await response.json();
    return data;
  }
};
