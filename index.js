const express = require("express");
const dotenv = require("dotenv");
//const path = require('path');

//configures dotenv to work in your application
dotenv.config();
const app = express();


//https://www.youtube.com/watch?v=rcsD2okrGbo
//how to send data

//https://kinsta.com/blog/express-typescript/
//Serve .tsx on express server so can communicate with backend


const PORT = process.env.PORT;



app.get("/home",(req,res)=>{
    res.status(200).send("Hello World");
    //res.sendFile('index.html',{root=__dirname});

})
app.get("/",(req,res)=>{
    res.status(200).send("Main Page");
    //res.sendFile('index.html',{root=__dirname});

})

//Listens for activity from port 3000
app.listen(PORT, () =>{
    console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
})
