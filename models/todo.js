// Requiring the mongoose
const mongoose = require("mongoose");

// Design the schema
const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  targetedDate: {
    type: String,
    required: true,
  },
});

// Name the schema and get the collection
const TodoCollection = mongoose.model("todo", todoSchema);

// Export the collection
module.exports = TodoCollection;
