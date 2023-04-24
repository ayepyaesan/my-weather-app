let searchinput=document.querySelector('#search-input');
let searchbtn=document.querySelector('#search-btn');
let currentbtn=document.querySelector('#current-locationbtn');
let uicity=document.querySelector('#city');
let uidate=document.querySelector('#date');
let uidescription=document.querySelector('#description');
let uitemperature=document.querySelector('#temperature');
let uihumidity=document.querySelector('#humidity');
let uiwind=document.querySelector('#wind');
let celsiusbtn=document.querySelector('#celsius');
let fahernheitbtn=document.querySelector('#fahernheit');
let uiunits=document.querySelector('.units');

//console.log(searchinput,searchbtn,currentbtn);

let apiKey="8161b4309ee03faae957729ba7104797";
let units="metric";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?`;


function showCity(response){
    //sconsole.log(response);
    uicity.innerHTML=response.data.name;
    uitemperature.innerHTML=Math.round(response.data.main.temp);
    uidescription.innerHTML=response.data.weather[0].main;
    uihumidity.innerHTML=response.data.main.humidity;
    uiwind.innerHTML=response.data.wind.speed;

}
function getCity(event){
    event.preventDefault();
   // console.log(searchinput.value.toLowerCase());
    let searchcity=searchinput.value;
    axios.get(`${apiUrl}q=${searchcity}&units=${units}&appid=${apiKey}`).then(showCity);
}
searchbtn.addEventListener('click',getCity);

function currPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;
    console.log(latitude,longitude);
    axios.get(`${apiUrl}&lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`).then(showCity);
}

currentbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(currPosition);
});

let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let today=days[new Date().getDay()];
let hours=new Date().getHours();
let minutes=new Date().getMinutes();
if(minutes < 10){
    minutes="0"+minutes;
}
//console.log(today,hours,minutes);
uidate.innerHTML=`${today} ${hours}:${minutes}`;

function celsius(){
    if(uiunits.innerText == "°F"){
    let celsiusdeg= Math.round((uitemperature.innerText - 32 )* 5 / 9 );
    uitemperature.innerHTML=`${celsiusdeg}`;
    uiunits.innerText="°C";
    }
}
function fahernheit(){
    if(uiunits.innerText == "°C"){
    let fahernheitdeg = Math.round((uitemperature.innerText * 9) / 5 + 32);
    uitemperature.innerHTML=`${fahernheitdeg}`;
    uiunits.innerText="°F";
    }
}

celsiusbtn.addEventListener('click',celsius);
fahernheitbtn.addEventListener('click',fahernheit);

