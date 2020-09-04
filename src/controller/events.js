const express = require('express')
const Event = require('../models/events')
const Organization = require("../models/organization")


//Assign an Event to an Organization
module.exports.addEventToOrg = async (eventID, orgID) => {

    try {

        const addEvent = await Organization.findByIdAndUpdate(
            { _id: orgID },
            { $push: { events: eventID } },
            { new: true, useFindAndModify: false }
        )
    } catch (e) {
        console.log("Unable to assign organization", e)
    }

}


