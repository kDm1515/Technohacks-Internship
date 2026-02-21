const container = document.querySelector('.card');
const search = document.querySelector('#search-btn');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// ⬇️ PASTE YOUR API KEY INSIDE THE QUOTES BELOW ⬇️
const APIKey = '8448fcf4bdedb1e872f1c3898629a0bb'; 

search.addEventListener('click', () => {
    const city = document.querySelector('#city-input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('#weather-icon');
            const temperature = document.querySelector('#temp');
            const description = document.querySelector('#desc');
            const humidity = document.querySelector('#humidity');
            const wind = document.querySelector('#wind');

            // Change image based on weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://openweathermap.org/img/wn/01d@4x.png';
                    break;
                case 'Rain':
                    image.src = 'https://openweathermap.org/img/wn/10d@4x.png';
                    break;
                case 'Snow':
                    image.src = 'https://openweathermap.org/img/wn/13d@4x.png';
                    break;
                case 'Clouds':
                    image.src = 'https://openweathermap.org/img/wn/03d@4x.png';
                    break;
                case 'Haze':
                    image.src = 'https://openweathermap.org/img/wn/50d@4x.png';
                    break;
                case 'Mist':
                    image.src = 'https://openweathermap.org/img/wn/50d@4x.png';
                    break;
                default:
                    image.src = 'https://openweathermap.org/img/wn/01d@4x.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°c</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});

