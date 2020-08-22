const express = require('express')
const Event = require('../models/events')
const Organization = require("../models/organization")

module.exports.addOrgToEvent = async (eventID, orgID) => {

    try {
        const addOrg = await Event.findByIdAndUpdate(
            { _id: eventID },
            { $push: { organizations: orgID } },
            { new: true, useFindAndModify: false }
        )
    } catch (e) {
        console.log("Unable to assign organization", e)
    }

}


