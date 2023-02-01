//requires express module
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
//initialise new express app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "&appid=0fa91e0e2bb628afab0148c5e5b6e684";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + apiKey + "&units=" + unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      //retrieves specific temp data
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>");
      res.write("<img src =" + imageURL + ">");
      res.send();
    });
  });
});


app.listen(3000, function () {
  console.log("Server is running on port 3000");
})
