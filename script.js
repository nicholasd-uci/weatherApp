
$(document).ready(function () {


  function makeHistory(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text)
    $(".history").append(li)
  }

  document.getElementById('search').addEventListener('click', event => {
    event.preventDefault()

    let city = document.getElementById('city').value

    // One Day - Current Weather
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=606e8adf3bbd843811975dde31618837`)
                                                                    //  add " &units=imperial " //
      .then(res => {

        if (history.indexOf(city) === -1) {
          history.push(city)
          localStorage.setItem("history", JSON.stringify(history))

          makeHistory(city)
        }
        // Weather API data Info
        console.log(res.data)
        document.getElementById('weather').innerHTML = `
                    <div class="dayCard">
                      <h5>City Name: ${res.data.name}</h5>
                      <h5>Temperature: ${res.data.main.temp}</h5>
                      <h5>Humidity: ${res.data.main.humidity}</h5>
                      <h5>Wind Speed: ${res.data.wind.speed}</h5>
                    </div>
                ` 
        getUVIndex(res.data.coord.lat, res.data.coord.lon)

      })
      .catch(err => { console.log(err) })

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=606e8adf3bbd843811975dde31618837`)
      .then(res => {
        let forecaster = res.data.list
        for (let i = 5; i < forecaster.length; i += 8) {
          console.log(forecaster[i])
          
          let forecasterElem = document.createElement('div')
          forecasterElem.innerHTML = `
                        <div class="cardCaster">
                          <h3>Forecast Date: ${forecaster[i].dt_txt}</h3>
                          <h5>Temperature: ${forecaster[i].main.temp}</h5>
                          <h5>Humidity: ${forecaster[i].main.humidity}</h5>
                          <h5>Wind Speed: ${forecaster[i].wind.speed}</h5>     
                        </div>      
                        `

          document.getElementById('forecaster').append(forecasterElem)
        }
      })
      .catch(err => { console.log(err) })
  })

  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/uvi?appid=606e8adf3bbd843811975dde31618837&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function (data) {
        console.log(data)
        var uv = $("#uvIndex").text("UV Index: ")
        var btn = $("<span>").addClass("btn btn-sm").text(data.value)
        // change color depending on uv value
        if (data.value < 3) {
          btn.addClass("btn-success")
        }
        else if (data.value < 7) {
          btn.addClass("btn-warning")
        }
        else {
          btn.addClass("btn-danger")
        }
        $("#uvIndex").append(uv.append(btn))
      }
    })
  }

  var history = JSON.parse(window.localStorage.getItem("history")) || []
  for (var i = 0; i < history.length; i++) {
    makeHistory(history[i])
  }

})




