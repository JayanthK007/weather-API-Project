const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){


const query = req.body.cityName;
const apikey = "e22f0d82cadfedede3cd7a28a2d54b51"
const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
https.get(url, function(response){
  console.log(response.statusCode);


response.on("data" ,function(data){
const weatherData = JSON.parse(data);
const temp = weatherData.main.temp;
const WeatherDescription =weatherData.weather[0].description;
console.log(temp);
res.write("<p>the weather is currently "+WeatherDescription+"</p>");
res.write("<h1>The temperature in "+query+ " is "+temp+ " degree celcious</h1>")
res.send();
});
});
});

app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
