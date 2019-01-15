
//After our page loads we run everthing inside this function
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(
        '.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            //pull information from api longitude and latitude
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //proxy lets us fetch data even in lost host
            const proxy =`https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/08a0969e8cfcda296713f1b643d8c379/${lat},${long}`;

        //getthing information from the URL API
        fetch(api)
        .then(response =>{
            return response.json(); //covert the response data into json
        }) //End of response
        
        .then(data =>{
            console.log(data);
            const {temperature, summary, icon} = data.currently;

            //set DOM elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimeZone.textContent = data.timezone;

                //Formula for Celcius
                let celsius = (temperature - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Change temperature to Celcius when clicked
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }

                })


        }); // End of getting data

    }); //End of Navigator
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // Look for - and replace with _ and change to Uppercase like SkyCon Website
        skycons.play(); //Initate SkyCon
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}); //End of Window load function

