import { Schema, model } from "mongoose";

export interface book {
    place : string,
    date : Date,
    provname : string,
    provFbid : string
}

export interface modelSchemauser {
    fbid : string,
    role : string,
    contact : number,
    pin : number,
    name : string,
    img : string,
    nearby : string,
    bookingscl : book[]
}

const Userdetclient = new Schema <modelSchemauser> ({
    fbid : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : 'customer'
    },
    contact : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true,
    },
    nearby : {
        type : String,
        required : true
    },
    pin : {
        type : Number,
        required : true
    },
    bookingscl: {
        type: [{
            place: String,
            date: Date,
            provname: String,
        },],
        default: []
    }
})

const modelSchemaexpuser = model('VehycleUser', Userdetclient)

export default modelSchemaexpuser;