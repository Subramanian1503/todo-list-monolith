// Requiring the contact collection of mongo
const Todo = require("../models/todo");

// Defining this constant to have a number in miliseconds until which the controller need to wait for the DB action to complete
const WAIT_TIME_FOR_DB_TO_PROCESS_CRUD_OPERATION = 100;

// Controller methods to do CRUD operations

// Creating a todo task from DB
module.exports.createTodo = function (request, response) {
  // Getting the inputs from the request
  const description = request.body.description;
  const category = request.body.category;
  const targetedDate = request.body.targetedDate;

  // Validating required parameters to create a todo
  const errorMessage = validateRequiredParametersForCreatingTodo(
    description,
    category,
    targetedDate
  );
  if (errorMessage != "") {
    return response.end(`<h1>${errorMessage}</h1>`);
  }

  // Create a todo list in DB
  Todo.create({
    description: description,
    category: category,
    targetedDate: targetedDate,
  });
  console.log("Todo created successfuly");

  setTimeout(function () {
    // Rendering the home page
    return response.redirect("/start");
  }, WAIT_TIME_FOR_DB_TO_PROCESS_CRUD_OPERATION);
};

// Deleting a todo task from DB
module.exports.deleteTodo = function (request, response) {
  // Getting the todo list identifier from request
  const selectedCheckBox = request.param("SelectedCheckBox");

  // Delete the todo list using the identifier
  if (typeof selectedCheckBox == "string") {
    console.log(selectedCheckBox);
    deleteTodoById(selectedCheckBox);
  } else {
    for (let checkBoxId of selectedCheckBox) {
      console.log(checkBoxId);
      deleteTodoById(checkBoxId);
    }
  }

  setTimeout(function () {
    // Rendering the home page
    return response.redirect("/start");
  }, 100);
};

/**
 * Validating the required parameters to create a todo task.
 *
 * @param {*} description Describes what needs to be done as part of this todo.
 * @param {*} category Describes what kind of category it might fall into.
 * @param {*} targetedDate Describes what is the targeted date for the todo task.
 */
function validateRequiredParametersForCreatingTodo(
  description,
  category,
  targetedDate
) {
  let errorMessage = "";

  // Validating the description whether it is present and valid
  if (description === "" || description === null || description === undefined) {
    errorMessage += "Required field: Description is not provided";
  }
  // Validating the category whether it is present and valid
  if (category === "NotProvided") {
    errorMessage += "Required field: Category is not provided";
  }
  // Validating the targetedDate whether it is present and valid
  if (
    targetedDate === "" ||
    targetedDate === null ||
    targetedDate === undefined
  ) {
    errorMessage += "Required field: Due date is not provided";
  }
  return errorMessage;
}

function deleteTodoById(checkBoxId) {
  Todo.findByIdAndDelete(checkBoxId)
    .then(function () {
      console.log("Selected checkbox deleted successfully");
    })
    .catch(function (error) {
      console.log(
        `Error: ${error} while trying to delete the selected checkbox`
      );
    });
}
