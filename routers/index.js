// Requiring the express to configure the router
const express = require("express");

// Requiring the router from express
const todoRouter = express.Router();
console.log(`The router for home created successfully`);

// Configure required URLS to route to the home controller
const homeController = require("../controllers/home_controller");
todoRouter.get("/start", homeController.home);

// Configuring required URLS to route to the todo_task_controller
const todo_task_router = require("./todo_task");
todoRouter.use("/todo", todo_task_router);

// Export the created router to be configured in the main class
module.exports = todoRouter;
