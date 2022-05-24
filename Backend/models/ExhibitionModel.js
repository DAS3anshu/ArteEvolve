const mongoose = require("../connection");

const schema = new mongoose.Schema({
  title: String,
  theme: String,
  thumbnail: String,
  ticketprice: Number,
  artworks: [{ type: mongoose.Types.ObjectId, ref: "artwork" }],
  createdBy: { type: mongoose.Types.ObjectId, ref: "users" },
  createdAt: Date,
});

// create model
const model = mongoose.model("exhibition", schema);

// export model
module.exports = model;
