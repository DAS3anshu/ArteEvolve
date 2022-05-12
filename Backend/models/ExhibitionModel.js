const mongoose = require('../connection');

const schema = new mongoose.Schema({
    title : String,
    category : String,
    schedule : String,
    admin : String,
    ticketprice : Number,
    createdAt : { type : Date, default: new Date() },
});

// create model
const model = mongoose.model("exhibition" , schema);


// export model
module.exports = model;