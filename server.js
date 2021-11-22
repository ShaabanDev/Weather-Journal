
// // Setup empty JS object to act as endpoint for all routes
 projectData = {};

// // Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
// Start up an instance of app
const app = express();
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
// body parser now is express in built so we dont need to use an outside module !
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
 app.use(cors())

 // defining the main project folder
const pubPath= path.join(__dirname,'/website')

// Initialize the main project folder
app.use(express.static(pubPath));

app.get('/get-weather',(req,res)=>{
    res.send(projectData)
    projectData={}
})

// the post route to get the data to the projectData 
app.post('/get-weather',(req,res)=>{
    const data = req.body
    projectData={
        temperature:data.temperature,
        date:data.date,
        userResponse:data.userResponse,
        code:data.code,
        name:data.name
    }
    res.end();
})

// get route to send the data to the client server
app.get('/get-weather',(req,res)=>{
    res.send(projectData)
})
// Setup Server
app.listen(4000,()=>{
    console.log('server is on at port 4000');
})
