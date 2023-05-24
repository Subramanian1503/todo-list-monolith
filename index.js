// Requiring express to configure the server
const express = require("express");

// Creating a application using express
const todoApplication = express();

// Initialising a port for the todo application
const port = "8080";

// Setup the view engine and package
todoApplication.set('view engine', 'ejs');
todoApplication.set('views', './views');

// Create a middleware to configure the main router class
const mainRouter = require('./routers');
todoApplication.use("/", mainRouter);

// Make the application to listen to configured port
todoApplication.listen(port, function (error) {
  if (error) {
    console.log(
      `Error: ${error} occurred while trying to listen the port: ${port}`
    );
    return;
  }
  console.log(
    `Todo application server listening the port: ${port} successfully`
  );
});
