// @ts-nocheck
'use strict'

const searchBtn = document.querySelector('.main__button');
const searchCity = document.querySelector('.main__input');
const searchLang = document.querySelector('.main__lang');
let temp = [];
const APIKey = '3ffe2ea29639380a36dd285c213cf530';

window.onload = () => {
   getInfo('Kazan', searchLang.value)
   document.querySelector('.main__button').textContent = (document.querySelector('.main__lang').value == 'ru' ? 'Поиск' : 'Search')
   document.querySelector('.main__input').placeholder = (document.querySelector('.main__lang').value == 'ru' ? 'Город' : 'City')
}

const editInfo = (info) => {
   document.querySelector('.main__city').textContent = info.city;
   document.querySelector('.main__country').textContent = info.country;
   document.querySelector('.temp__now').textContent = "Температура: " + info.temp + "°C";
   document.querySelector('.weather__main').textContent = info.weather.main;
   document.querySelector('.weather__description').textContent = info.weather.description[0].toUpperCase() + info.weather.description.slice(1);
   document.querySelector('.weather__logo').src = `http://openweathermap.org/img/wn/${info.weather.icon}@2x.png`;
   document.querySelector('.main__wind').textContent = "Ветер: " + info.wind + 'м/c';
}

const getInfo = (city, lang) => {
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
         editInfo(res[document.querySelector('.log__logs').value])
      })
      .catch((err) => {
         console.log(err)
      })
}

document.querySelector('.log__logs').onchange = function (e) {
   editInfo(temp[document.querySelector('.log__logs').value])
}

document.querySelector('.main__lang').onchange = function () {
   document.querySelector('.main__button').textContent = (document.querySelector('.main__lang').value == 'ru' ? 'Поиск' : 'Search')
   document.querySelector('.main__input').placeholder = (document.querySelector('.main__lang').value == 'ru' ? 'Город' : 'City')
}

searchBtn.onclick = function (e) {
   e.preventDefault()
   getInfo(searchCity.value, searchLang.value)
}
