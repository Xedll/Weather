// @ts-nocheck
'use strict'

const searchBtn = document.querySelector('.main__button');
const searchCity = document.querySelector('.main__input');
const searchLang = document.querySelector('.lang__select');
let temp = [];
const APIKey = '3ffe2ea29639380a36dd285c213cf530';
let langs = {
   'en': {
      'temperature': 'Temperature',
      'wind': 'Wind',
      'speed': 'mps',
      'search': 'Search',
      'history': 'Search history',
      'city': 'City',
      'language': 'Language',
   },
   'ru': {
      'temperature': 'Температура',
      'wind': 'Ветер',
      'speed': 'м/с',
      'search': 'Поиск',
      'history': 'История поиска',
      'city': 'Город',
      'language': 'Язык',
   }
}

window.onload = () => {
   getInfo('Казань', 'ru')
   setLang()
}

const editInfo = function (info, language) {
   document.querySelector('.main__city').textContent = info.city;
   document.querySelector('.main__country').textContent = info.country;
   document.querySelector('.temp__now').textContent = langs[language].temperature + ': ' + info.temp + "°C";
   document.querySelector('.weather__main').textContent = info.weather.main;
   document.querySelector('.weather__description').textContent = info.weather.description[0].toUpperCase() + info.weather.description.slice(1);
   document.querySelector('.weather__logo').src = `http://openweathermap.org/img/wn/${info.weather.icon}@2x.png`;
   document.querySelector('.main__wind').textContent = langs[language].wind + ": " + info.wind + ' ' + langs[language].speed;
}

const setLang = function () {
   searchBtn.textContent = langs[searchLang.value].search
   searchCity.placeholder = langs[searchLang.value].city
   document.querySelector('.log__title').textContent = langs[searchLang.value].history
   document.querySelector('.lang__title').textContent = langs[searchLang.value].language
   editInfo(temp[document.querySelector('.log__logs').value], searchLang.value)

}

const getInfo = function (city, lang) {
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=${lang}`)
      .then((data) => {
         return data.json()
      })
      .then((result) => {
         if (result.message) {
            document.querySelector('.main__city').textContent = result.message[0].toUpperCase() + result.message.slice(1)
         } else {
            if (temp.length >= 5) {
               temp.splice(0, 1)
               temp.push({
                  city: result.name,
                  country: result.sys.country,
                  temp: result.main.temp,
                  weather: result.weather[0],
                  wind: result.wind.speed
               })
            } else {
               temp.push({
                  city: result.name,
                  country: result.sys.country,
                  temp: result.main.temp,
                  weather: result.weather[0],
                  wind: result.wind.speed
               })
            }
            return temp
         }
      })
      .then((info) => {
         document.querySelector('.log__logs').innerHTML = ``
         info.forEach((item, index) => {
            document.querySelector('.log__logs').innerHTML += `<option selected value=${index}>${item.city}</option>`
         })
         return info
      })
      .then((res) => {
         editInfo(res[document.querySelector('.log__logs').value], lang)
      })
      .catch((err) => {
         console.log(err)
      })
}

document.querySelector('.log__logs').onchange = function (e) {
   editInfo(temp[document.querySelector('.log__logs').value], searchLang.value)
}

searchLang.onchange = function () {
   setLang()
}

searchBtn.onclick = function (e) {
   e.preventDefault()
   getInfo(searchCity.value, searchLang.value)
}
