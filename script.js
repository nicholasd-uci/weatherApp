
        // this is was added to give BUTTON line 17 --> a clickable event by .getElementById() & then .addEventListener to make that button a clickable button. //
        document.getElementById('search').addEventListener('click', event => {
            // this is so when you serach for a city... it does not refresh the page once it renders //
            event.preventDefault()

            let city = document.getElementById('city').value

            // we always want to add ** https:// to all api's -- ALWAYS. -->
            // once we determined the .then&.catch functions we moved to the temp literal. Then we were able to make a function let city = the value of city on line 13/14 //
            // **This is just the day's URL weather** //
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=606e8adf3bbd843811975dde31618837`)            
                .then(res => {
                    console.log(res.data)
                    // document = render from outside of the script tags. grabbing ('Whatever') by getElementById and making it active by setting up a  .innerHTML to the end of it --> 
                    // then use a Temp Literal// 
                    document.getElementById('weather').innerHTML = `
                    <h1>City Name: ${res.data.name}</h1>
                    <h5>Temperature: ${res.data.main.temp}</h5>
                    <h5>Humidity: ${res.data.main.humidity}</h5>
                    <h5>Wind Speed: ${res.data.wind.speed}</h5>
                    <h5>UV Index: ${''}</h5>

                `
                    // need to figure out how to get the temps in F-Degree  //
                    // we found the answer in the API key doc. we had to add " &units=imperial " // 
                })

                .catch(err => { console.log(err) })
                // End of axios.get   //
                
                // this is the 5 day URL forcast //
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=606e8adf3bbd843811975dde31618837`)
                .then(res =>{ 
                    // we make this let = to res.data.list for the calling of the 5 day window forcast //
                    let forecaster = res.data.list

                    // Make a for loop to start our forcast to loop over the days in the list: 
                    // we then set i to 5 for it being 5 o'clock and increase by 8 in the list, for each 5PM 4 5days
                    for (let i = 5; i < forecaster.length; i += 8) {
                        // we want to see in the console log our for loop working //
                        console.log(forecaster[i])
                        // let forecasterElem = --> this half to create it into the div on line 24 //
                        let forecasterElem = document.createElement('div')
                        // set the innerHTML so that it shows on the page //
                        forecasterElem.innerHTML = `
                        <h3>City Name: ${forecaster[i].dt_txt}</h3>
                        <h5>Temperature: ${forecaster[i].main.temp}</h5>
                        <h5>Humidity: ${forecaster[i].main.humidity}</h5>
                        <h5>Wind Speed: ${forecaster[i].wind.speed}</h5>
                        <h5>UV Index: ${''}</h5>            
                        `
                        // after we MAKE IT we need to grab the forecaster div --> then append it to the bottom of page //
                        document.getElementById('forecaster').append(forecasterElem)
                    }
                })
                .catch(err => { console.log(err) })
                // Ends 2nd axios.get    //
        })


