"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Userdetclient = new mongoose_1.Schema({
    fbid: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    contact: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    nearby: {
        type: String,
        required: true
    },
    current_defect: {
        type: String,
        required: true,
        default: 'body'
    },
    pin: {
        type: Number,
        required: true
    },
    notification: {
        type: [{
                place: String,
                date: Date,
                providername: String,
                spe: String,
                consumerBookingId: String,
                providerBookingId: String,
            },],
        default: []
    },
    bookingscl: {
        type: [{
                place: String,
                date: Date,
                provname: String,
                provFbid: String,
                imgpr: String,
                status: String,
                _id: String,
                providerBookingId: String,
                contact: Number,
                spe: String
            },],
        default: []
    }
});
const modelSchemaexpuser = (0, mongoose_1.model)('VehycleUser', Userdetclient);
exports.default = modelSchemaexpuser;
