let cityName = document.querySelector(".city h3")
let temperature = document.querySelector(".temp")
let icon = document.querySelector(".condition img")
let desc = document.querySelector(".condition p")
let card = document.querySelector(".weather-card")
let button = document.querySelector(".fa-arrow-right")

document.querySelector("input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    button.click();
  }
});




button.addEventListener("click", getData)

function getData() {
    let city = document.querySelector("input").value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"afb963ddf7521fbd95deff5d9606415b"}&units=metric`)
      .then(response => response.json())
      .then(response => show(response))
      .catch(err => console.error(err))
}


function show(weather) {
  if(weather.message !== "city not found") {
    country = weather.sys.country
    span = document.createElement("span")
    span.appendChild(document.createTextNode(country))
    span.classList = "country"

    cityName.innerHTML = weather.name
    cityName.appendChild(span)

    temperature.innerHTML = Math.trunc(weather.main.temp)

    desc.innerHTML = weather.weather[0].description
    let code = codeOf(weather.weather[0].description)
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${code}@2x.png`);
    card.style.opacity = 1
  }
}

function codeOf(str) {
  switch (str) {
    case "clear sky":
      return "01n"
    case "few clouds":
      return "02n"
    case "scattered clouds":
      return "03n"
    case "broken clouds":
      return "04n"
    case "shower rain":
      return "09n"
    case "rain":
      return "10n"
    case "thunderstorm":
      return "11n"
    case "snow":
      return "13n"
    case "mist":
      return "50n"
  }
}