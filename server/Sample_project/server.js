//imports
const express = require("express");  //Route
const cors = require("cors");  //Frontend backend connectivity
const env = require("dotenv"); //Global Data
const morgan = require("morgan"); //Api status 

//config
const app = express();  // Get into the app
env.config(); //Getting Global data

//middleware
app.use(express.json());   // Calling function
app.use(express(cors));    // Calling function
app.use(morgan('dev'));    // Calling function

//route
// app.get('/data',(req,res)=>{         //
//     res.send("Hello world")          //
// });                                  //
// app.get('/bin',(req,res)=>{          //
//     res.send("Welcome")              //
// })                                     // Get method api



//
const address = require('./routers/address.router')
app.use('/api/address',address)
//





//server
app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`server connected this port:${process.env.PORT}`)
    }
})
