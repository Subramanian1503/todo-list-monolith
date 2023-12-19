// Requiring the contact collection of mongo
const Todo = require("../models/todo");

// Finding all the todo list from DB
module.exports.home = function (request, response) {
  // Getting todo list from DB using todo controller
  const todoList = Todo.find({})
    .then(function (todoList) {
      // Rendering the home page
      response.render("home", {
        title: "Todo Application",
        todoList: todoList,
      });
    })
    .catch(function (error) {
      console.log("Error occurred while trying to fetch DB");
      return;
    });
};
