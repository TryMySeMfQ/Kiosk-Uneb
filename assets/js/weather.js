function updateWeather() {
    const apiKey = '38ffd0c5aa34a767c8231cc682bec4c0';
    const city = 'Alagoinhas';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp.toFixed(0); // Temperatura arredondada
        const weatherDescription = data.weather[0].description;
        const weatherIconCode = data.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
        const humidity = data.main.humidity; // Umidade em porcentagem
        const windSpeed = data.wind.speed; // Velocidade do vento em m/s

        document.getElementById('weather-temp').textContent = `${temp}°C`;
        document.getElementById('weather-city').textContent = city;
        document.getElementById('weather-icon').src = weatherIconUrl;
        document.getElementById('weather-icon').alt = weatherDescription;
        document.getElementById('weather-humidity').textContent = `${humidity}%`;
        document.getElementById('weather-wind').textContent =`${windSpeed} m/s`;
    })
    .catch(error => console.error('Erro ao obter dados do clima:', error));
}

// Atualiza o clima a cada 10 minutos
setInterval(updateWeather, 600000);
updateWeather(); // Chama a função imediatamente para atualizar ao carregar a página
