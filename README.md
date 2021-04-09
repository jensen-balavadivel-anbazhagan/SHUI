# SHUI

SHUI is a web app where the users are able to login and follow different available streams and also publish their own new streams

## Installation
This app uses **Docker compose** (requires docker desktop) to start api and client containers at the same time.
Before starting the installation create a .env file in the **api** folder in order to store all the secret keys used in the application

Enter **docker-compose up --build** to build and start image / containers.

If need to start up the application seperately then follow the below steps

**To start client**

cd client

npm install - To install the necessary libraries required only the first time

npm run serve

**To start api**

cd api

npm install - To install the necessary libraries required only the first time

node server.js
