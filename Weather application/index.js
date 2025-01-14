const weatherForm = document.querySelector(".weatherform");
const cityinput = document.querySelector(".entercity");
const card = document.querySelector(".card");
const apikey = "133387a243ac5b4fcd49fe10762d4b0e";

weatherForm.addEventListener("submit",  async event => {
    event.preventDefault();

   const city =  cityinput.value;

   if(city){
    try{
        const weatherdata = await Getweather(city);
        displayweatgerinfo(weatherdata);
    }
    catch(error){
        console.error(error);
        displayerror(error);

    };
    

   }
   else{
    displayerror("Please enter a city");
    

   }




})

async function Getweather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(url);

    if (!response.ok){
        throw new Error("could not fetch data");

    }
    return await response.json();





    
}

 function displayweatgerinfo(data){

    
    const {name: city, 
        main: {temp,humidity},
        weather:[{description,id}]} = data;


        card.textContent = "";
        card.style.display = "flex";

        const citydisplay = document.createElement("h1");
        const tempdisplay = document.createElement("p");
        const humiditydisplay = document.createElement("p");
        const descriptiondisplay= document.createElement("p");
        const weatheremoji = document.createElement("p");

        citydisplay.textContent = city;
        tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        humiditydisplay.textContent = `Humidity: ${humidity}%`;
        descriptiondisplay.textContent = description;
        weatheremoji.textContent = Getweatheremoji(id);


        citydisplay.classList.add("citydisplay");
        tempdisplay.classList.add("tempdisplay");
        humiditydisplay.classList.add("humiditydisplay");
        descriptiondisplay.classList.add("descriptiondisplay");
        weatheremoji.classList.add("weatheremoji");

        card.appendChild(citydisplay);
        card.appendChild(tempdisplay);
        card.appendChild(humiditydisplay);
        card.appendChild(descriptiondisplay);
        card.appendChild(weatheremoji);

}

function Getweatheremoji(weatherid){

    switch(true){
        case(weatherid >= 200 && weatherid < 300):
        return "⚡";
        case(weatherid >= 300 && weatherid < 400):
        return "⛈️";
        case(weatherid >= 500 && weatherid < 600):
        return "⛈️";
        case(weatherid >= 600 && weatherid < 700):
        return "❄️";
        case(weatherid >= 700 && weatherid < 800):
        return "🌊";
        case(weatherid === 800):
        return "☀️";
        case(weatherid >= 801 && weatherid < 810):
        return "☁️";
        default:
            return "😵‍💫"
        

        
        
        



    }





}
 
function displayerror(message){

const errorDisplay =  document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");

card.textcontent = "";
card.style.display="flex";
card.appendChild(errorDisplay);

    

}

