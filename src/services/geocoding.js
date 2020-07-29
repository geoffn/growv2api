const express = require('express')
const axios = require('axios')
require("dotenv").config();


///Return lat/lng of a given address
geocodeAddress = async (address) => {

    const geoAPIKey = '&key=' + process.env.GOOGLE_API_KEY
    const geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + geoAPIKey



    console.log(geoURL)
    let results = await axios.get(geoURL)
        .catch((e) => {
            console.log(e)
        })
    console.log(results.data.results[0].geometry.location)

    return results.data.results[0].geometry.location

}

module.exports = geocodeAddress