const userTab= document.querySelector("[data-userWeather]");
const searchTab= document.querySelector("[data-searchWeather]");
const userInfoContainer= document.querySelector(".user-info-container");
const grantAccessContainer= document.querySelector(".grant-location-container");
const searchForm= document.querySelector("[data-searchForm]");
const loadingScreen= document.querySelector(".loading-container ");

let currentTab=userTab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";

currentTab.classList.add("current-tab");

// switching tabs

userTab.addEventListener("click",()=>{
    switchTab(userTab);
});


searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab"); 
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");    

        if(!searchTab.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            getFromStorageSession();
        }
    }
};

function getFromStorageSession(){
    const localCoordiniates=sessionStorage.getItem("user-coordinates");
    if(!localCoordiniates){
        grantAccessContainer.classList.add("active");

    }
    else{
        const coordinates=JSON.parse(localCoordiniates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const{lat,lon}=coordinates;

    grantAccessContainer.classList.remove("active");

    loadingScreen.classList.add("remove"); 

    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    const data= await response.json()
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");

    renderWeatherInfo(data);
}

function renderWeatherInfo(weatherInfo){
  //fetch elements
  const cityName= document.querySelector("[data-cityName]");
  const countryIcon= document.querySelector("[data-countryIcon]");
  const desc= document.querySelector("[data-weatherDesc]");
  const weatherIcon= document.querySelector("[data-weatherIcon]");
  const temp= document.querySelector("[data-temp]");
  const windspeed= document.querySelector("[data-windspeed]");
  const humidity= document.querySelector("[data-humidity]");
  const cloudiness= document.querySelector("[data-cloudiness]");

    //render
    cityName.innerHTML= weatherInfo?.name;
    // countryIcon.src=;
    desc.innerHTML= weatherInfo?.weather?.[0]?.description
    temp.innerHTML= weatherInfo?.main?.temp;
    windspeed.innerHTML= weatherInfo?.wind?.speed;
    humidity.innerHTML= weatherInfo?.main?.humidity;
    cloudiness.innerHTML= weatherInfo?.clouds?.all;
    
}

const grantAccessButton=document.querySelector("[data-grantAccess]");

 grantAccessButton.addEventListener("click",getLocation);

 function getLocation(){
        
 }

