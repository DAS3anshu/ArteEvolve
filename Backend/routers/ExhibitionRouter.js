// importing express
const express = require('express');
const res = require('express/lib/response');
const { append, status } = require('express/lib/response');

const Model = require("../models/ExhibitionModel")

// create router
const router = express.Router();


router.get('/home', (req, res) => {
    console.log("a request at user home");
    res.send("you have find user Home in userrouter");
});

router.post('/add', (req, res) => {
    console.log(req.body);

    // for sorting data in database
    new Model(req.body).save()
    .then((data) => {
        console.log('user saved');
        res.status(200).json({message: "success" });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    })

    console.log("Add Request");
    

});


router.get('/getbyid/:id', (req, res) => {
    console.log("a request on getbyid");


    // req is use for read the data of  request  
    
    console.log(req.params.id);
    res.send("you have rquested on /getbyid in user");
});


router.get('/getall',(req,res) => {

    Model.find( {} )
    .then((data) => {
        console.log('user saved');
        res.status(200).json(data);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.post('/authenticate', (req,res) => {

    const formdata =req.body;

    Model.findOne({ email : formdata.email,password : formdata.password })
    .then((data) => {
        
      if(data){
          console.log('login success');
          res.status(200).json(data);
      }else{
          console.log('login failed');
          res.status(400).json( {message: 'failed'});
      }

    })
     .catch((err) => {
        console.error(err);
        res.status(500).json(err);
        
    });
});

router.delete('/delete/:id', (req , res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('user Deleted');
        res.status(200).json(data);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.put("/update/:id" , (req , res ) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
        console.log('data updated');
        res.status(200).json(data);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
})

//export 
module.exports = router;