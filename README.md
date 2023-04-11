# NodeJS Express React Coding Challenge


This project contains a backend server written using NodeJS and express and a react frontend using typescript. The frontend user interface will allow users to input any given country as a string and then have information about this country rendered back to the user.

# Technology Stack

+ NodeJs
+ Express
+ React
+ Typescript
+ Vercel

# Resources
+ [Cors](https://www.npmjs.com/package/cors)
+ [Dotenv](https://www.npmjs.com/package/dotenv)
+ [Winston](https://www.npmjs.com/package/winston)
+ [ExpressJS](https://www.npmjs.com/package/express)
+ [Nodemon](https://www.npmjs.com/package/nodemon)
+ [Rimraf](https://www.npmjs.com/package/rimraf)
+ [Pre Commit](https://www.npmjs.com/package/pre-commit)
+ [Typescript](https://www.npmjs.com/package/typescript)
+ [Create React App](https://create-react-app.dev/)
+ [React Bootstrap](https://www.npmjs.com/package/react-bootstrap)
+ [Jest](https://www.npmjs.com/package/jest)
+ [Super Test](https://www.npmjs.com/package/supertest)


# Summary of Code
This section will cover briefly the working of server and client
## Server
The server is a express nodejs application that exposes a **GET** endpoint for getting the country data for a given country. The server internally calls [RestCountriesAPI](https://restcountries.com/#endpoints-name) for getting the data.

```
Country API
-------------

Request Method: GET

Path Parameter: country

Request URL: http://{host}:{port}/api/:country

Response Body: 
[
    {}, 
    {},
    ...
]

Example If running project locally:
http://localhost:8000/api/France
```



## Client
The client is a react typescript application that fetches the data from the backend server. It consists a Search Form where the user can input the country name and submit. It displays the total result count and the results in card grid format. It uses react bootstrap for the components. 

## Preview

![Landing Page Preview](/react-app-images/react-ss-1.png?raw=true "Landing Page Preview")


![Result Page Preview](/react-app-images/react-ss-2.png?raw=true "Result Page Preview")



# Running Application

## Requirement 

Node version: `v19.8+` <br/>
Node version used when developing: `v19.8.1`

## server

+ Go to server directory `cd server`
+ Install dependencies `npm install`
+ Build the node app `npm run build`
+ Start the app `npm run start`
+ To start in Development mode `npm run dev`

The application is configured to run on port `8000`

To check if the api is working http://localhost:8000/api/Ireland


## client
+ Go to client directory `cd client`
+ Change the **api_url** in [App.tsx](/client/src/App.tsx) to `http://localhost:8000` instead of the Vercel url
+ Install dependencies `npm install`

Development mode
+ To start the client in development mode `npm start`

Production build and run
+ To create a production build `npm run build`
+ To serve the newly generated build folder with static folder 
   +  `npm install -g serve`
   + `serve -s build`

To access the client go to http://localhost:3000

# Live App
https://bounce-ucd.vercel.app/









