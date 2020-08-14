const express = require('express')
const organizationRouter = new express.Router
const Organization = require('../models/organization')
const cors = require('cors')

organizationRouter.get("/organization", cors(), async (req, res) => {
    try {
        const foodbank = await Organization.find({})
        //organization.save()
        res.status(200).send({ results: organization })

    } catch (e) {
        res.send(e + 'error')
    }

})

organizationRouter.get("/organization/search/:search", cors(), async (req, res) => {
    //Geocode address and get lat/lng
    //add lat/lng to the search parameters
    //return results
    console.log("searchaddress")
    organizationLatLng = await geocodeAddress(req.params.search)
    console.log(organizationLatLng)

    try {
        const organization = await Organization.find({
            latitude: { $gt: organizationLatLng.lat - .3, $lt: organizationLatLng.lat + .3 },
            longitude: { $gt: organizationLatLng.lng - .3, $lt: organizationLatLng.lng + .3 }
        })

        res.status(200).send({ results: organization })
    } catch (e) {
        res.send(e)
    }

})

organizationRouter.get("/organization/:id", cors(), async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id)

        res.send(organization)

    } catch (e) {
        res.send(e + 'error')
    }

})

organizationRouter.post("/organization", cors(), async (req, res) => {
    const organization = new Organization({
        ...req.body
    })
    try {
        await organization.save()
        res.status(201).send(organization)
    } catch (e) {
        res.status(400).send(e)
    }

})

organizationRouter.post("/organizationbulk", cors(), async (req, res) => {
    var organizationArray = new Organization()

    //console.log(req.body)

    organizationArray.collection.insert(req.body, onInsert)
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

organizationRouter.delete("/organization/:id", cors(), async (req, res) => {
    try {
        const organization = await Organization.findByIdAndDelete(req.params.id)
        console.log(organization)
        res.status(200).send(organization)
    } catch (e) {
        res.status(500).send(e)
    }


})

module.exports = organizationRouter

