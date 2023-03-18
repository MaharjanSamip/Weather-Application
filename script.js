document.addEventListener(`DOMContentLoaded`, () => {
    // Displaying date 
    (function displayDate(){
        var currentDate = new Date(); 
        document.getElementById("display-date").innerHTML = currentDate.toDateString();
    })();
    const searchBtn = document.querySelector('.search-btn');
    console.log(searchBtn);
    searchBtn.addEventListener( 'mousedown', () => {
        const cityName = document.querySelector('.search-txt').value;
        console.log(cityName);
        getGeographicalLocationAPI( cityName );
    })

    function getGeographicalLocationAPI( cityName = 'Windsor' ){
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=9964006f86896128a73526b1d2b01786`)
        .then(response => response.json())
        .then(geoData => {

            let latitude = geoData[0]['lat'];
            let longitude = geoData[0]['lon'];

            weatherAPI( latitude, longitude, cityName );

        })
        .catch(err => alert("Wrong city name."))
    }
    getGeographicalLocationAPI();
    //Calling API to get latitude and longiude of a particular city 

    function weatherAPI(latitude, longitude, cityName){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9964006f86896128a73526b1d2b01786`)
        .then(response => response.json())
        .then(weatherData => {
            
            const weatherDescription = `${weatherData['weather'][0]['description']}`;
            const temperature = (weatherData['main']['temp'])-273.15;
            const feels_like = (weatherData['main']['feels_like'])-273.15;
            const pressure = weatherData['main']['pressure'];
            const humidity = weatherData['main']['humidity'];
            const windSpeed = weatherData['wind']['speed'];
            const weatherState = `${weatherData['weather'][0]['main']}`;
            // const weatherState = `Rain`;


            //Inserting the fetched values to their respective classes in HTML
            document.querySelector(".weather-type").innerHTML = weatherDescription.toUpperCase();
            document.querySelector(".city-name").innerHTML = cityName;
            document.querySelector(".temperature span").innerHTML = parseInt(temperature);
            document.querySelector(".feels-like span").innerHTML = parseInt(feels_like);
            document.querySelector(".pressure span").innerHTML = parseInt(pressure);
            document.querySelector(".humidity span").innerHTML = parseInt(humidity);
            document.querySelector(".wind span").innerHTML = parseInt(windSpeed);

            if ( weatherState == "Clouds" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud";
            }
            else if ( weatherState == "Haze" || weatherState == "Mist" )
            {
                document.querySelector("#weather-icon").className = "fa-sharp fa-solid fa-smog";
            }
            else if ( weatherState == "Rain" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-rain";
            }
            else if ( weatherState == "Thunderstorm" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-bolt";
            }
            else if ( weatherState == "Snow" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-snowflake";
            }
            else if ( weatherState == "Clear" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-sun";
            }
            else if ( weatherState == "Drizzle" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-sun-rain";
            }


            (function weatherDesc(){
                console.log("Weather Description::");
                console.log(weatherDescription);
                console.log(temperature);
                console.log(feels_like);
                console.log(pressure);
                console.log(humidity);
                console.log(windSpeed);
                console.log(cityName);
                console.log('latitude: '+ weatherData['coord']['lat']);
                console.log('longitude '+ weatherData['coord']['lon']);
                console.log("state "+weatherState);
            })();
            
        })
        .catch(err => alert("Wrong name."))
    }
})  
        

