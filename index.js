require("dotenv").config();
require('./src/db/mongoose')
const express = require("express");
const cors = require('cors')

const app = express();

//Import our user router and call
const foodbankRouter = require("./src/routers/foodbank");
const eventRouter = require("./src/routers/events")
//const userRouter = require("./api/user/user.router");
var corsOptions = {
    origin: '*',
    optionsSuccessSatus: 200,
    enablePreflight: true,
    crossDomain: true
}
app.use(cors(corsOptions))


// const port = process.env.port || 3001
const port = 3001

app.use(express.json())

app.use(foodbankRouter)
app.use(eventRouter)




//app.use('/api/user', userRouter);


app.listen(port, () => {
    console.log("server running on " + port)
});