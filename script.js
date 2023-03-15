// Displaying date 
    function displayDate(){
        var currentDate = new Date(); 
        document.getElementById("display-date").innerHTML = currentDate.toDateString();
    }
// Displaying date 

fetch('http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=bc3087d5d8223a6532de2f91bbbe34c2')
    .then(response => response.json())
    .then(ddata => console.log(data))

.catch( err => alert("Wrong city name."))
