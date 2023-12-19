// Requiring express to configure the server
const express = require("express");

// Creating a application using express
const todoApplication = express();

// Initialising a port for the todo application
const port = "8080";

// Encode the urls using express middleware
todoApplication.use(express.urlencoded());

// Connect the mongo configuration to the server
const db = require("./configs/mongoose");

// Setup the view engine and package
todoApplication.set("view engine", "ejs");
todoApplication.set("views", "./views");

// Setup middleware to configure the static files for css
todoApplication.use(express.static("assets"));

// Create a middleware to configure the main router class
const mainRouter = require("./routers");
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
