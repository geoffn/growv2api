const mongoose = require('mongoose')
const validator = require('validator')
const Event = require('./events')

const organizationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address1: {
        type: String,
        required: true,
        trim: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    stateRegion: {
        type: String,
        required: true,
        trim: true
    },
    countryId: {
        type: Number,
        default: 01
    },
    addressCode: {
        type: String,
        required: true,
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
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ]



}, {
    timestamps: true
})



const Organization = mongoose.model('Organization', organizationSchema)

module.exports = Organization

