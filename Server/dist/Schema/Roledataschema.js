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
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: [],
        default: [0]
    },
    bookings: {
        type: []
    }
});
const modelSchemaexpprov = (0, mongoose_1.model)('Vehycleprov', Userdetprov);
exports.default = modelSchemaexpprov;
