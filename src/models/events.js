const mongoose = require('../db/mongoose')
const validator = require('validator')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    phones: [
        {
            numberType: {
                type: String,
                trim: true
            },
            number: {
                type: String,
                trim: true
            }
        }
    ],
    url: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Not a valid URL')
            }
        }
    },
    social: [
        {
            socialName: {
                type: String
            },
            socialLink: {
                type: String
            }
        }
    ],
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    foodbanks: [
        {
            foodbankId: {
                type: ObjectId
            }
        }
    ]

}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event