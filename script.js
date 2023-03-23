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
            // const weatherState = `Clouds`;


            //Inserting the fetched values to their respective classes in HTML
            document.querySelector(".weather-type").innerHTML = weatherDescription.toUpperCase();
            document.querySelector(".city-name").innerHTML = cityName;
            document.querySelector(".temperature span").innerHTML = parseInt(temperature);
            document.querySelector(".feels-like span").innerHTML = parseInt(feels_like);
            document.querySelector(".pressure span").innerHTML = parseInt(pressure);
            document.querySelector(".humidity span").innerHTML = parseInt(humidity);
            document.querySelector(".wind span").innerHTML = parseInt(windSpeed);
            const application = document.querySelector(".App"); 
            
            if ( weatherState == "Clouds" ) //
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8BEkJHl8vjxFMqe41teP4nd89N3enu00dYYDL4sSYWoaV-4GBfyNNL3lnVTctS-RaYUzHlK29ENTH3ni-6ocZM-PciV705Xc7-04mMQ86w1vKxT7kM6p8HK1Q4K6EQyvlDkJZtssUxPVC9l3L0PnWpO=w340-h560-no?authuser=0')";

            }
            else if ( weatherState == "Haze" || weatherState == "Mist" ) //
            {
                document.querySelector("#weather-icon").className = "fa-sharp fa-solid fa-smog";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8D4-YLQEeMugD1xHIEOnBvhLu2EWBmkbhoxwtXfMtAa5pjpb2dm7tAnzvZg_TpWwJSw380tmHq19FbMDhO0w795AVPX18TrRQhjgccR8rqnMjriNVtmlQZ0xiEmL1XOhoKHInMP7SwtVKpyi1T3K48R=w340-h560-no?authuser=0')";

            }
            else if ( weatherState == "Rain" ) //
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-rain";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8AAA1vIvfoJlcABmWiW0ajmcS_0tX9gE9KCmRDjn_E5T2_OyIztnewW1Fm8FwCgECJmirLyfkap6sBmjWNSuo1YdutFnsEdw5sXzt8cwR1OOiV6duV67uknGA1u8RuGRXw-RDuTJDk0OGFFoivtwf5v=w340-h560-no?authuser=0')";

            }
            else if ( weatherState == "Thunderstorm" )//
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-bolt";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8AynDiLxMRuLG4iKBKiMGAKAFM4tqhQqYuF_azmHapkhlQ05PTby3Wf1z-m8hIm2Bu5ne2oA-zUVAFs4c6-O7I4Rrf_hsZxwl9plouxnVVO9cf5DQIOT1z3aTjFsxiWDIAdZt7qUCvMUpJKrZxSSsqD=w340-h560-no?authuser=0')";

            }
            else if ( weatherState == "Snow" )//
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-snowflake";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8AUZfvA8OeVfIcr1IbjQP8-emc43nFKVVaaJ-hKGb0O_XeO2e80vk_rBywPnaeoj1OEGn-352le8RLcnxU7Uqm-3TXTY86hnF1eM9uHXpvlKyzgGMBkKBh6zMIEky5nd9MZmSOSNdqh0FzAlEPR-4w4=w340-h560-no?authuser=0')";

            }
            else if ( weatherState == "Clear" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-sun";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8BrPzbhGkUq8Eewmik9JfXZOaOdIWR2XpceF3o4FfPuhBWW3c7FvQn50FCvGDcR8x7Ee3e-Y2rA2hchh-TbtXzpSJhEgecRQya-7LSXPKEJAW8o5uitjrUTpvu5nzgtTpyhwV-wy17RD-kp6RmBVut4=w340-h540-no?authuser=0')";

            }
            else if ( weatherState == "Drizzle" )
            {
                document.querySelector("#weather-icon").className = "fa-solid fa-cloud-sun-rain";

                application.style.backgroundImage = "url('https://lh3.googleusercontent.com/pw/AMWts8AAA1vIvfoJlcABmWiW0ajmcS_0tX9gE9KCmRDjn_E5T2_OyIztnewW1Fm8FwCgECJmirLyfkap6sBmjWNSuo1YdutFnsEdw5sXzt8cwR1OOiV6duV67uknGA1u8RuGRXw-RDuTJDk0OGFFoivtwf5v=w340-h560-no?authuser=0')";

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
        

