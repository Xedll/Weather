'use strict'

const searchBtn = document.querySelector('.main__search');
const searchCity = document.querySelector('.main__input');
const APIKey = '3ffe2ea29639380a36dd285c213cf530';

window.onload = () => {
   getInfo('Kazan')
}

const getInfo = (city) => {
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=ru`)
      .then((data) => {
         return data.json()
      })
      .then((result) => {
         console.log(result)
         // @ts-ignore
         document.querySelector('.main__city').textContent = result.name ? result.name : result.message;
         // @ts-ignore
         document.querySelector('.temp__max').textContent = "Максимальная температура: " + result.main.temp_max + "°C";
         // @ts-ignore
         document.querySelector('.temp__min').textContent = "Минимальная температура: " + result.main.temp_min + "°C";
         // @ts-ignore
         document.querySelector('.temp__now').textContent = "Температура: " + result.main.temp + "°C";
         // @ts-ignore
         document.querySelector('.weather__main').textContent = result.weather[0].main;
         // @ts-ignore
         document.querySelector('.weather__description').textContent = result.weather[0].description[0].toUpperCase() + result.weather[0].description.slice(1) ;
         // @ts-ignore
         document.querySelector('.weather__logo').src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
         // @ts-ignore
         document.querySelector('.main__wind').textContent = "Скорость ветра: " + result.wind.speed + 'м/c';
      })
      .catch((err) => {
         console.log(err)
      })
}

// @ts-ignore
searchBtn.onclick = function () {
   // @ts-ignore
   getInfo(searchCity?.value)
}