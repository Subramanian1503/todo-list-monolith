module.exports.createTodo = function (request, response) {
  return response.end("<h1>Create</h1>");
};

module.exports.deleteTodo = function (request, response) {
  return response.end("<h1>Delete</h1>");
};
