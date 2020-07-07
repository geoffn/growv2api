const express = require('express')
const foodbankRouter = new express.Router
const Foodbank = require('../models/foodbank')

foodbankRouter.get("/foodbank", async (req, res) => {
    try {
        const foodbank = await Foodbank.find({})
        //foodbank.save()
        res.status(200).send({ results: foodbank })

    } catch (e) {
        res.send(e + 'error')
    }

})

foodbankRouter.get("/foodbank/:id", async (req, res) => {
    try {
        const foodbank = await Foodbank.findById(req.params.id)

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

foodbankRouter.delete("/foodbank/:id", async (req, res) => {
    try {
        const foodbank = await Foodbank.findByIdAndDelete(req.params.id)
        console.log(foodbank)
        res.status(200).send(foodbank)
    } catch (e) {
        res.status(500).send(e)
    }


})

module.exports = foodbankRouter

