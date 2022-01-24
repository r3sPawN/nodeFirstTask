import { readFile, writeFile } from "fs/promises";
import * as http from "http";
import fetch from "node-fetch";
import { sendEmail } from "./mail.js";

const server = http.createServer();

const data = JSON.parse(
  await readFile(new URL("./config.json", import.meta.url))
);

const response = await fetch(
  `http://api.weatherapi.com/v1/current.json?key=2ae80041831d4eabb99234451222301&q=${data.city}&aqi=no`
);

if (!response.ok) {
  const message = `An error has occured: ${response.status}, most likely no internet connection`;
  throw new Error(message);
}

const weather = await response.json();

const weatherInfo = `The current time in ${weather.location.name} is ${weather.location.localtime} and the temperature is ${weather.current.temp_c} degrees`;

writeFile("weather.txt", weatherInfo, function (err){
  if(err){
    console.log(`fail`);
  }
  console.log("File written successfully\n");
});

sendEmail(data.email, weatherInfo);

server.on("request", (request, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      weather,
    })
  );
});

server.listen(3000);
