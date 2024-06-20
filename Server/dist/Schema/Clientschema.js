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
    nearby: {
        type: String,
        required: true
    },
    bookingscl: {
        type: []
    }
});
const modelSchemaexpuser = (0, mongoose_1.model)('VehycleUser', Userdetclient);
exports.default = modelSchemaexpuser;
