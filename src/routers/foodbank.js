const express = require('express')
const foodbankRouter = new express.Router
const Foodbank = require('../models/foodbank')
const cors = require('cors')

foodbankRouter.get("/foodbank", cors(), async (req, res) => {
    try {
        const foodbank = await Foodbank.find({})
        //foodbank.save()
        res.status(200).send({ results: foodbank })

    } catch (e) {
        res.send(e + 'error')
    }

})

foodbankRouter.get("/foodbank/:id", cors(), async (req, res) => {
    try {
        const foodbank = await Foodbank.findById(req.params.id)

        res.send(foodbank)

    } catch (e) {
        res.send(e + 'error')
    }

})

foodbankRouter.post("/foodbank", cors(), async (req, res) => {
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

foodbankRouter.post("/foodbankbulk", cors(), async (req, res) => {
    var foodbankArray = new Foodbank()

    //console.log(req.body)

    foodbankArray.collection.insert(req.body, onInsert)
    // .then(results => console.log(results))
    // .catch(e => console.log(e))

    function onInsert(err, docs) {
        if (err) {
            console.log(err)
            res.status(400).send(e)
        } else {

            res.status(201).send()
        }
    }

})

foodbankRouter.delete("/foodbank/:id", cors(), async (req, res) => {
    try {
        const foodbank = await Foodbank.findByIdAndDelete(req.params.id)
        console.log(foodbank)
        res.status(200).send(foodbank)
    } catch (e) {
        res.status(500).send(e)
    }


})

module.exports = foodbankRouter

