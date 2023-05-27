let input = document.getElementById("input");
let userinput;
let tempData;
let tempResult = document.getElementById('temp-result');
let resultHvalue = document.getElementById('result-hvalue');
let resultLvalue = document.getElementById('result-lvalue');
let cityResult = document.getElementById('city-result');
let countryResult = document.getElementById('country-result')
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

  var geoSuccess = function (pos) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = pos;
    document.getElementById("startLat").innerHTML = startPos.coords.latitude;
    document.getElementById("startLon").innerHTML = startPos.coords.longitude;
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
