const express = require('express')
const eventRouter = new express.Router
const Event = require('../models/events')
const geocodeAddress = require('../services/geocoding')
const cors = require('cors')
const Organization = require("../models/organization")
const OrganizationController = require('../controller/organization')
const EventController = require('../controller/events')



eventRouter.get("/event/addressCode/:addressCode", cors(), async (req, res) => {

    try {

        const event = await Event.find({ addressCode: req.params.addressCode })

        res.status(200).send({ results: event })

    } catch (e) {
        res.send(e + 'error')
    }

})

eventRouter.get("/event/search/:search", cors(), async (req, res) => {
    //Geocode address and get lat/lng
    //add lat/lng to the search parameters
    //return results
    console.log("searchaddress")
    eventLatLng = await geocodeAddress(req.params.search)

    try {
        const event = await Event.find({
            latitude: { $gt: eventLatLng.lat - .3, $lt: eventLatLng.lat + .3 },
            longitude: { $gt: eventLatLng.lng - .3, $lt: eventLatLng.lng + .3 }
        })

        res.status(200).send({ results: event })
    } catch (e) {
        res.send(e)
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

        console.log(req.body)

        //is org id populated? add to event
        if (req.body.organizationID) {

            await OrganizationController.addOrgToEvent(event._id, req.body.organizationID)
            // try {
            //     const addOrgtoEvent = await Event.findByIdAndUpdate(
            //         { _id: event._id },
            //         { $push: { organizations: req.body.organizationID } },
            //         { new: true, useFindAndModify: false }
            //     )
            // } catch (e) {
            //     console.log("Unable to assign organization", e)
            // }

            await EventController.addEventToOrg(event._id, req.body.organizationID)
            // try {

            //     const consoleOrg = await Organization.findById({ _id: req.body.organizationID })
            //     console.log(consoleOrg)
            //     const addEventtoOrg = await Organization.findByIdAndUpdate(
            //         { _id: req.body.organizationID },
            //         { $push: { events: event._id } },
            //         { new: true, useFindAndModify: false }
            //     )
            // } catch (e) {
            //     console.log("Unable to assign organization", e)
            // }
        }


        //if event was created with an Organization ID
        //Update Event with orginazation ID,
        //Event will have to include the address from front end.
        //If Use Org address is true then we should not need to lookup anything
        //else assign address and look up lat/lang
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