// Requiring the express to configure the router
const express = require("express");

// Requiring the router from express
const todoTaskRouter = express.Router();
console.log(`The router for todo_tasks created successfully`);

// Configuring required URLS to route to the todo_task_controller
const todo_task_controller = require("../controllers/todo_task_controller");
todoTaskRouter.post("/create", todo_task_controller.createTodo);
todoTaskRouter.get("/delete", todo_task_controller.deleteTodo);

// Export the created router to be configured in the main class
module.exports = todoTaskRouter;
