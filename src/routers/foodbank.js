const express = require('express')
const foodbankRouter = new express.Router
const Foodbank = require('../models/foodbank')

foodbankRouter.get("/", async (req, res) => {
    try {
        const foodbank = await Foodbank.find({})
        //foodbank.save()
        res.send(foodbank)

    } catch (e) {
        res.send(e + 'error')
    }

})


module.exports = foodbankRouter