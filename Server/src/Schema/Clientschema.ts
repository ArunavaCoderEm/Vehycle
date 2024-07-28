import { Schema, model } from "mongoose";

export interface book {
    place : string,
    date : Date,
    provname : string,
    provFbid : string,
    imgpr : string,
    status : string,
    _id : string,
    contact:number
    providerBookingId: string
}

export interface modelSchemauser {
    fbid : string,
    role : string,
    contact : number,
    pin : number,
    name : string,
    img : string,
    nearby : string,
    current_defect : string,
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
    current_defect : {
        type : String,
        required : true,
        default : 'body'
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
            provFbid: String,
            imgpr: String,
            status : String,
            _id : String,
            providerBookingId: String,
            contact: Number   
        },],
        default: []
    }
})

const modelSchemaexpuser = model('VehycleUser', Userdetclient)

export default modelSchemaexpuser;