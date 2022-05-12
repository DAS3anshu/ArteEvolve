const mongoose = require('../connection');


// create structure as like schema is like structure 
const schema = new mongoose.Schema({
    email : String,
    password : String,
    username : String,
    age : Number,
    createdAt : { type : Date, default: new Date() },
});

// create model
const model = mongoose.model("users" , schema);


// export model
module.exports = model;