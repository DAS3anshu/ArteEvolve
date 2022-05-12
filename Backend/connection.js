const mongoose = require("mongoose");

const url = "mongodb+srv://anshika:DASanshu123@cluster0.leutj.mongodb.net/MERNDATABASE?retryWrites=true&w=majority"


// this will return promise
mongoose
  .connect(url)
  .then(() => { console.log('database connected'); 
})
.catch((err) => {
    console.error(err); 
});


//this is important
module.exports = mongoose;