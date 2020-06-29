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

foodbankRouter.post("/foodbank", async (req, res) => {
    const foodbank = new Foodbank({
        ...req.body
    })
    try {
        await foodbank.save()
        res.status(201).send(foodbank)
    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = foodbankRouter

