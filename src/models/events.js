const mongoose = require('mongoose')
const validator = require('validator')


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
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
    name: {
        type: String,
        trim: true
    },
    address1: {
        type: String,
        trim: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        trim: true
    },
    stateRegion: {
        type: String,
        trim: true
    },
    countryId: {
        type: Number,
        default: 01
    },
    addressCode: {
        type: String,
        trim: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
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
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]

}, {
    timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event