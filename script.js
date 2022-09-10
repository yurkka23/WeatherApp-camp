const link = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=metric&key=MN66RFCF48QFXHB99NNREJVTD&contentType=json";

const searchButton = document.getElementById('city-search');

searchButton.addEventListener('click', () => searchWeather());

function searchWeather(){
    const searchedCity = document.getElementById('city')?.value;

    if(searchedCity != ''){
        getCityWeather(searchedCity);
    } else {
        showErrorMessage("Please enter some city and try again!");
    }
}

async function getCityWeather(searchedCity){
    const result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchedCity}?unitGroup=metric&key=MN66RFCF48QFXHB99NNREJVTD&contentType=json`)
                            //.catch(showErrorMessage("Wait something wrong!"));//if api doesn't work
    if(result.ok){
        const infoWeatherElement = document.getElementById('info-weather');
        infoWeatherElement.classList.add('active-weather');
        const data = await result.json();
        console.log(data);///!!!!

        renderReportInfo(data);
        renderDate(data);
        renderIcons(data);
    }else{
        showErrorMessage("Please enter correct name city!");;
    }
}

function showErrorMessage(message){
    const errorElemant = document.getElementById('error');
    const errorText = document.querySelector('.error-text');
    errorElemant.classList.add('active');
    errorText.innerHTML = message;

    setTimeout(() => errorElemant.classList.remove('active'), 5000);
}

function renderReportInfo(data){
    const weatherWrap = document.querySelector('.weather-wrapper');
    weatherWrap.classList.add('activeWrap');
    
    const {feelslike, humidity,sunrise,visibility,sunset,pressure,datetime,temp, conditions } = data.currentConditions;
    const {resolvedAddress} = data;
    
    const feelslikeElem = document.getElementById('feelslike');
    const humidityElem = document.getElementById('humidity');
    const sunriseElem = document.getElementById('sunrise');
    const visibilityElem = document.getElementById('visibility');
    const sunsetElem = document.getElementById('sunset');
    const pressureElem = document.getElementById('pressure');

    const notExist = 'N/A';
    feelslikeElem.innerHTML = feelslike == undefined || null ? notExist : `${feelslike} &#8451;` ;
    humidityElem.innerHTML = humidity == undefined || null ? notExist : humidity + '%';
    sunriseElem.innerHTML = sunrise == undefined || null ? notExist : sunrise;
    visibilityElem.innerHTML = visibility == undefined || null ? notExist : `${visibility} km`;
    sunsetElem.innerHTML = sunset == undefined || null ? notExist : sunset;
    pressureElem.innerHTML = pressure == undefined || null ? notExist : pressure + 'GPa';

    const timeElem = document.querySelector('.view-time');
    let timeCut = datetime.split(':');
    timeElem.innerHTML = timeCut[0] + ':' + timeCut[1];

    const dayElem = document.querySelector('.view-day');
    const dayOfWeek = new Date().getDay();
    dayElem.innerHTML = getDayOfWeek(dayOfWeek);
    
    const tempElem = document.querySelector('.temp');
    tempElem.innerHTML = temp == undefined || null ? notExist : `${temp} &#8451;`;

    const tempInfoElem = document.querySelector('.temp-info');
    tempInfoElem.innerHTML = conditions == undefined || null ? notExist : conditions;

    const infoCityHeaderElem = document.querySelector('.info-city-header');
    infoCityHeaderElem.innerHTML = resolvedAddress.split(',')[0];

    const infoCityTextElem = document.querySelector('.info-city-text');
    infoCityTextElem.innerHTML = resolvedAddress;

    const dateElem = document.querySelector('.date');
    dateElem.innerHTML = resolvedAddress;
}
function renderDate(data){
    const {datetime} = data.days[0];
    const year = datetime.split('-')[0];
    const day = datetime.split('-')[2];
    const month = getMonth(+datetime.split('-')[1]);
   
    const dateElem = document.querySelector('.date');
    dateElem.innerHTML = `${day} ${month}, ${year}`;
}
function renderIcons(data){
    const { icon } = data.currentConditions;//rain, partly-cloudy-day,clear-day, cloudy
    

    const viewIconElem = document.querySelector('.view-icon');
    const infoIconElem = document.querySelector('.info-icon');

   viewIconElem.classList.remove('rain');
    viewIconElem.classList.remove('partly-cloudy-day');
    viewIconElem.classList.remove('clear-day');
    viewIconElem.classList.remove('cloudy');

    infoIconElem.classList.remove('rain');
    infoIconElem.classList.remove('partly-cloudy-day');
    infoIconElem.classList.remove('clear-day');
    infoIconElem.classList.remove('cloudy');


    switch(icon){
        case 'rain':
            //viewIconElem.classList.add('rain');
            //infoIconElem.classList.add('rain');
            infoIconElem.innerHTML = `<img src="/img/fog.png" alt="rain">`;
            viewIconElem.innerHTML = `<img src="/img/fog.png" alt="rain">`;
            break;
        case 'partly-cloudy-day':
            //viewIconElem.classList.add('partly-cloudy-day');
            //infoIconElem.classList.add('partly-cloudy-day');
            infoIconElem.innerHTML = `<img src="/img/partly.png" alt="partly-cloud">`;
            viewIconElem.innerHTML = `<img src="/img/partly.png" alt="partly-cloud">`;
            break;
        case 'clear-day':
           // viewIconElem.classList.add('clear-day');
            //infoIconElem.classList.add('clear-day');
            infoIconElem.innerHTML = `<img src="/img/clear.png" alt="clear">`;
            viewIconElem.innerHTML = `<img src="/img/clear.png" alt="clear">`;
            break;
        case 'cloudy':
            //viewIconElem.classList.add('cloudy');
            //infoIconElem.classList.add('cloudy');
            infoIconElem.innerHTML = `<img src="/img/cloud.png" alt="cloud">`;
            viewIconElem.innerHTML = `<img src="/img/cloud.png" alt="cloud">`;
            break;
    }
}

function getMonth(month){
    switch(month){
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
    }
}
function getDayOfWeek(day){
    switch(day){
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
    }
}