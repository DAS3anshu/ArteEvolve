const mongoose = require("../connection");

// create structure as like schema is like structure
const schema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
  artist: { type: mongoose.Types.ObjectId, ref: "users" },
  createdAt: Date,
});

// create model
const model = mongoose.model("artwork", schema);

// export model
module.exports = model;
