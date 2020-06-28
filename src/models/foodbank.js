const mongoose = require('mongoose')

const foodbankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Foodbank = mongoose.model('Foodbank', foodbankSchema)

module.exports = Foodbank
