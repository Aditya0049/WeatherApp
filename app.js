
const express = require("express");
const https = require("https");
const body_parser = require("body-parser");

const app = express();

app.use(body_parser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");

});
app.post("/", function(req, res){

    const query = req.body.CityName;
    const apikey = "90aaa38387102df01f22c741d98d6f1c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit+"";
    https.get(url , function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp
        const weatherdescription = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon
        const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        const wind = weatherdata.wind.speed

        res.write("<p> Weather is currently <em><b>" + weatherdescription +".</b></em></p>");
        res.write("<h1>The tempreture in "+query+" is "+temp+" degree celcius.</h1>");
        res.write(" <img src="+ imgurl +">");
        res.write("<p> Wind speed is currently <em><b>" + wind +" km/h.</b></em></p>");
        res.send();
      });
    });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
