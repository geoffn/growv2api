require("dotenv").config();
require('./src/db/mongoose')
const express = require("express");

const app = express();

//Import our user router and call
const foodbankRouter = require("./src/routers/foodbank");


const port = process.env.port || 3001

app.use(express.json())

app.use(foodbankRouter)

//const userRouter = require("./api/user/user.router");




//app.use('/api/user', userRouter);


app.listen(port, () => {
    console.log("server running on " + port)
});