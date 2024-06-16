import { useState } from "react";
function Weather() {
  const [cityName,setCityName]= useState("");
  const[weather,setWeather]= useState({});

  function handleName(e){
    setCityName(e.target.value)
    console.log(cityName)
  }
  function handleSearch(){
    const myKeys= "fcd6a40e04c6478541bf80874fe9edf1"
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKeys}&units=metric`;
    if(cityName){
      fetch(url).then((response)=>{
        return response.json();
      })
      .then((data)=>{
        setWeather(data);
      })
      .catch((error)=>{
        console.error("xyz",error)
      })
    }
  }

  return (
    <>
      <div className="bg-image bg-cover bg-no-repeat h-screen flex justify-center">
        <div className="w-3/5 h-4/5 bg-[#8080807d] rounded-lg flex">
          {/* left div */}
          <div className="w-1/2 bg-left h-full bg-cover bg-no-repeat rounded-l-lg flex flex-col justify-between">
            <div className="flex justify-end m-4">
              <p className="font-bold text-2xl">
              {weather.name &&weather.name} {weather.sys && weather.sys.country}
              </p>
            </div>
            <div className="flex justify-center">
              <img src={` https://openweathermap.org/img/wn/${weather.weather && weather.weather[0].icon}@2x.png`}
              className="rounded-full bg-[#ffffff85] w-2/5" alt="" />
            </div>

            <div className="flex space-between m-4">
              <div className="font-bold text-xl text-gray-200">
                <p>{weather.coord && weather.coord.lon}</p>
                <p>{weather.coord && weather.coord.lat}</p>
              </div>

              <div className="font-bold text-xl text-gray-200">
                <p>{weather.main && weather.main.temp}°C</p>
              </div>
            </div>
          </div>
          {/* right panel */}
          <div className="h-full w-1/2">
            <div className="h-1/5 flex justify-center items-center border-b border-gray-300 m-4">
            <img src={` https://openweathermap.org/img/wn/${weather.weather && weather.weather[0].icon}@2x.png`}
              className="rounded-full bg-[#ffffff85] w-1/5" alt="" />
            </div>
            <div className="flex border border-gray-200 rounded-lg w-3/5 mx-auto">
              <input
                type="search"
                name=""
                id=""
                className="bg-transparent outline-none text-white placeholder-white px-2 py-1"
                placeholder="Search"
                onChange={handleName}
              />
              <span class="material-symbols-outlined" className="material-symbols-outlined text-xl cursor-pointer text-white bg-black rounded-full p-1 " onClick={handleSearch}>search</span>{" "}
            </div>
            {weather.name && (
              <div className="text-center text-white font-semibold my-s">
                <p>{weather.name},{weather.sys && weather.sys.country}</p>
                <p>{weather.weather && weather.weather[0].description}</p>
              </div>
            )}
            {weather.name && (
            <>
              <div className="flex justify-around font-bold text-white border-b border-gray-300 m-6 p-2">
                <p>Temp</p>
                <p>{weather.main && weather.main.temp}°C</p>
              </div>
              <div className="flex justify-around font-bold text-white border-b border-gray-300 m-6 p-2">
                <p>Visibility</p>
                <p>{weather.visibility && weather.visibility / 1000}Km</p>
              </div>
              <div className="flex justify-around font-bold text-white border-b border-gray-300 m-6 p-2">
                <p>Wind Speed</p>
                <p>{weather.wind && weather.wind.speed}meter/sec</p>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
