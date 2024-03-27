const URL = "52bf98b6b816410573419a49c00d4339";
let inputCity = document.querySelector("input");
let card = document.querySelector(".card");
let btn = document.querySelector("button");


 

btn.addEventListener("click", async (event) =>{

    event.preventDefault();
    
    const city = inputCity.value;
    
    if(inputCity.value){

        try{
            let weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter city");
    }
});

const getWeatherData = async (city)=>{

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${URL}`;
    const response = await fetch(apiurl);
    if(!response.ok){
        throw new Error("Could Not Fetch Data");
    }

    return await response.json();

}

const displayWeather = (weatherData) =>{

    console.log(weatherData);

    const { name: city,
            main : {temp,humidity},
            weather: [{description,id}]} = weatherData;

    card.innerText = "";
    card.style.display = "flex";

    let city_name = document.createElement("h1");
    let temperature = document.createElement("p");
    let h = document.createElement("p");
    let dis = document.createElement("p");
    let e = document.createElement("p");
    


    
    city_name.textContent = city;
    temperature.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    h.textContent = `Humidity : ${humidity}%`;
    dis.textContent = description;
    e.textContent = getEmoji(id);

    city_name.classList.add("first");
    temperature.classList.add("first");
    h.classList.add("second");
    dis.classList.add("third");
    e.classList.add("emoji");

    card.append(city_name);
    card.append(temperature);
    card.append(h);
    card.append(dis);
    card.append(e);

    

}

function getEmoji(weatherId){

    if(weatherId >= 200 && weatherId < 300){
        return "⛈";
    }
    else if(weatherId >= 300 && weatherId < 400){
        return "🌧";
    }
    else if(weatherId >= 500 && weatherId < 600){
        return "🌧";
    }
    else if(weatherId >= 600 && weatherId < 700){
        return "❄";
    }
    else if(weatherId >= 700 && weatherId < 800){
        return "🌫";
    }
    else if(weatherId === 800){
        return "☀";
    }
    else if(weatherId >= 801 && weatherId < 810){
        return "☁";
    }
    else{
        return "❓";
    }

}




function displayError(message){
    let errorDisplay = document.createElement("p");
    errorDisplay.innerText = message;
    errorDisplay.classList.add("again");
    card.innerText = "";
    card.style.display = "flex";
    card.append(errorDisplay);
    
}



