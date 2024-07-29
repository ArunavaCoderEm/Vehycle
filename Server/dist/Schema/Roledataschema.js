"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Userdetprov = new mongoose_1.Schema({
    fbid: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true
    },
    specialist: {
        type: String,
        required: true,
        default: 'cleaner'
    },
    hourlyrate: {
        type: Number,
        default: 229
    },
    desc: {
        type: String,
        required: true
    },
    nearby: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: [Number],
        default: [0]
    },
    notification: {
        type: [{
                place: String,
                date: Date,
                def: String,
                clientname: String,
                consumerBookingId: String,
                providerBookingId: String,
            },],
        default: []
    },
    bookings: {
        type: [{
                place: String,
                date: Date,
                clientname: String,
                clientFbid: String,
                imgcl: String,
                status: String,
                _id: String,
                consumerBookingId: String,
                contact: Number,
                def: String
            },],
        default: []
    }
});
const modelSchemaexpprov = (0, mongoose_1.model)('Vehycleprov', Userdetprov);
exports.default = modelSchemaexpprov;
