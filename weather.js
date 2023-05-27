let input = document.getElementById("input");
let userinput;
let tempData;
let startLat;
let startLon;
let cityName = document.getElementById('cityName');
let temp = document.getElementById('temp')
let tempResult = document.getElementById('temp-result');
let resultHvalue = document.getElementById('result-hvalue');
let resultLvalue = document.getElementById('result-lvalue');
let cityResult = document.getElementById('city-result');
let countryResult = document.getElementById('country-result');
let cardR = document.getElementById('card-result');
window.onload = function () {
  var startPos;
  var nudge = document.getElementById("nudge");

  var showNudgeBanner = function () {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function () {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);
  var geoSuccess =  async function (pos) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = pos;
    startLat= startPos.coords.latitude;
    startLon = startPos.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startLat}&lon=${startLon}&appid=ab566aa3f08d69d549ab5c3333e0d79f`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      cityName.innerText = data.name
      temp.innerText = Math.floor(data.main.temp - 273)
    })
  };
  var geoError = function (error) {
    switch (error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  
  input.addEventListener("change", (e) => {
    cardR.style.display = "flex"
    userinput = e.target.value
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userinput}&appid=ab566aa3f08d69d549ab5c3333e0d79f`
    )
      .then((res) => res.json())
      .then((data) =>   {
        console.log(data)
        tempResult.innerText = Math.floor(data.main.temp - 273)
        resultHvalue.innerText = Math.floor(data.main.temp_max - 273)
        resultLvalue.innerText = Math.floor(data.main.temp_min - 273)
        cityResult.innerText = data.name
        countryResult.innerText  = data.sys.country
      })
  });
};
