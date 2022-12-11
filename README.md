# Tavel Planner App

## Project Summary

This app serves as travel planner and guide. You simply ente the destination, departure date, and arrival date. And
the app will provide you with information about the destination such as weather, image of the location, a flag
of the country. It allows you save trips once you click of save trip button. If the trip is within a week, you will get the
current weather forecast. If the trip is in the future, you will get a predicted forecast. The project uses four APIs to
gather data about your destination. It uses the geonames API to get the coordinates of the city you desire to visit. It uses
the WeatherBit API to show the current and predicted forcast if you trip in the future. Also, it uses the pixaBay API to
get an image of the location you are planning to visit. finally, the RESTcountries API which displays the flag of the
country you are visiting.

## Screenshots
![image](https://user-images.githubusercontent.com/18706769/206882532-e4aad03f-33de-41e0-996a-a17d4c5ab515.png)
![image](https://user-images.githubusercontent.com/18706769/206882564-5c90ebbc-971a-4a89-bc4f-08bbe3c034b2.png)
![image](https://user-images.githubusercontent.com/18706769/206882525-95b5ad7b-e0db-43d4-82e7-9a6793a26443.png)


## Installation

- Clone the project: git clone https://github.com/youssef1405/Travel-Guide-App.git
- Open a terminal and cd to the project folder
- Run npm install to install dependencies
- Run npm build-prod
- Run npm run start to start the express server on port 8000
- Go to localhost:8000

## APIs Used

- Pixabay
- WeatherBit
- Geonames
- RESTcountries

## Built With

- HTML5
- JavaScript
- Node.js
- Express.js
- Sass
- Webpack
- Jest

## Author

- Youssef Girgeis ♥
