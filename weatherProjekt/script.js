const url = 'https://api.openweathermap.org/data/2.5';
const key = '2207853db1033e47032308d8704d4ff8';

document.addEventListener('DOMContentLoaded', () => {
    const searchbar = document.getElementById('searchbar'); 

    if (searchbar) {
        searchbar.addEventListener('keypress', setQuery);
    } else {
        console.error('Searchbar element not found');
    }
});

const setQuery = (e) => {
    if (e.keyCode === 13) {
        getResult(document.getElementById('searchbar').value); 
    }
};

const getResult = (cityName) => {
    let query = `${url}/weather?q=${cityName}&appid=${key}&units=metric&lang=de`;

    fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(displayResult)
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

const displayResult = (result) => {
    // console.log(result);
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `Min : ${Math.round(result.main.temp_min)}°C / Max : ${Math.round(result.main.temp_max)}°C`;
};