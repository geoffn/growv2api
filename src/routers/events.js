const express = require('express')
const eventRouter = new express.Router
const Event = require('../models/events')
const cors = require('cors')


eventRouter.get("/event/addressCode/:addressCode", cors(), async (req, res) => {

    try {

        const event = await Event.find({ addressCode: req.params.addressCode })

        res.status(200).send({ results: event })

    } catch (e) {
        res.send(e + 'error')
    }

})
eventRouter.get("/event", cors(), async (req, res) => {
    try {
        const event = await Event.find({})

        res.status(200).send({ result: event })

    } catch (e) {
        res.send(e + 'error')
    }

})



eventRouter.post("/event", cors(), async (req, res) => {

    const event = new Event({
        ...req.body
    })

    try {
        await event.save()
        res.status(201).send(event)
    } catch (e) {
        res.status(500).send(e)
    }

})


module.exports = eventRouter