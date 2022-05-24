const mongoose = require("../connection");

// create structure as like schema is like structure
const schema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  avatar: String,
  age: Number,
  isAdmin: { type: Boolean, default: false },
  createdAt: Date,
});

// create model
const model = mongoose.model("users", schema);

// export model
module.exports = model;
