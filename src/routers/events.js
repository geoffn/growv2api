const express = require('express')
const eventRouter = new express.Router
const Event = require('../models/events')
const geocodeAddress = require('../services/geocoding')
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
    let eventLatLng = null

    try {
        //Save new event 
        await event.save()
        //After save
        //If lat and lng were not provided then look them up and update event.

        if (!event.latitude || !event.longitude) {


            try {


                //Test various nulls
                let address = ''
                //address connector becomes + once one value is added
                let addressConnector = ''
                if (event.address1) {
                    address = encodeURIComponent(event.address1)
                    addressConnector = '+'
                }
                if (event.city) {
                    address = address + addressConnector + encodeURIComponent(event.city)
                    addressConnector = '+'
                }
                if (event.stateRegion) {
                    address = address + addressConnector + encodeURIComponent(event.stateRegion)
                    addressConnector = '+'
                }
                if (event.addressCode) {
                    address = address + addressConnector + encodeURIComponent(event.addressCode)
                    addressConnector = '+'
                }


                //use geocode api to return lat and lng of address provided
                eventLatLng = await geocodeAddress(address)

            }
            catch (e) {
                console.log(e)
            }

            //Construct new event with the lat and lng then update


            try {

                const udpateEvent = await Event.findByIdAndUpdate(
                    { _id: event._id },
                    {
                        $set: {
                            latitude: eventLatLng.lat,
                            longitude: eventLatLng.lng
                        }
                    })

            }
            catch (e) {
                console.log(e)
            }


        }


        res.status(201).send(event)
    } catch (e) {
        res.status(500).send(e)
    }


})


module.exports = eventRouter