const mongoose = require('../connection');


// create structure as like schema is like structure 
const schema = new mongoose.Schema({
    image : String,
    description : String,
    artist : String,
    details : String,
    price : Number,
    createdAt : { type : Date, default: new Date() },
});

// create model
const model = mongoose.model("artwork" , schema);


// export model
module.exports = model;