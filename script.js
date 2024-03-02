function showError(message) {
    const errorBox = document.querySelector('.error-box');
    const errorMessage = document.querySelector('.error-message');

    errorMessage.textContent = message; // Setze die Fehlermeldung
    errorBox.style.display = 'block'; // Zeige die Fehlerbox an
}

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');

search.addEventListener('click', () => {
    const APIKey = '25661845e7bc01c616e4b8584e9f6fdd';
    const input = document.querySelector('.search-box input').value;

    if (input === '') 
        return;

 
    const searchType = isNaN(input) ? 'q' : 'zip';
    const queryParam = searchType === 'q' ? `q=${input}` : `zip=${input}`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?${queryParam}&units=metric&lang=de&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {

            const image = document.querySelector('.weather-box img');
            const errorImage = document.querySelector('.error-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const sunrise = document.querySelector('.sunrise span');
            const sunset = document.querySelector('.sunset span');
            
            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png'
                    break;
                case 'Rain':
                    image.src = 'img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'img/snow.png';
                    break;
                case 'Mist':
                    image.src = 'img/clouds.png';
                    break;
                case 'Clouds':
                    image.src = 'img/partly.png';
                    break;
                case 'Thunderstorm':
                    image.src = 'img/thunder.png';
                    break;
                case 'Partly':
                    image.src = 'img/partly.png';
                    break;
                default:
                    image.style.display = 'none'; // Standard-Wetterbild ausblenden
                    errorImage.style.display = 'block'; // Fehlerbild anzeigen
            }

            temperature.innerHTML = `${parseInt(data.main.temp)}<span>℃</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
            sunrise.innerHTML = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString('de-DE')}`;
            sunset.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString('de-DE')}`;
            
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            
            const weatherDetails = document.querySelector('.weather-details');
            const errorBox = document.querySelector('.error-box');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const image = document.querySelector('.weather-box img'); // Das Standard-Wetterbild
            const errorMessageElement = document.querySelector('.error-message');
            
            weatherDetails.style.display = 'none'; // Restliche Wetterdaten ausblenden
            errorBox.style.display = 'block'; // Fehlerbox anzeigen
            temperature.style.display = 'none'; // Temperatur ausblenden
            description.style.display = 'none'; // Beschreibung ausblenden
            image.style.display = 'none'; // Standard-Wetterbild ausblenden
            
            errorMessageElement.innerHTML = "Ooops! Da ging etwas schief. <br> Ort nicht gefunden... Bitte PLZ prüfen. <br> Bei Orten mit mehreren PLZ, Hauptplz benutzen!"; // Setze die Fehlermeldung

        }); const search = document.querySelector('.search-box button');
        
        search.addEventListener('click', () => {
          const input = document.querySelector('.search-box input').value;
        
          if (input === '') {
            return;
          }
        
         
          const searchType = isNaN(input) ? 'q' : 'zip';
          const queryParam = searchType === 'q' ? `q=` : `zip=`;
        
          fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=de&appid=`)
            .then(response => response.json())
            .then(data => {
              
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
            });
        });
        
        
        document.querySelector('.search-box input').addEventListener('keyup', (event) => {
          if (event.key === 'Enter') {
            search.click();
          }
        });

});
