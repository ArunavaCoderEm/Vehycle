import { Schema, model } from "mongoose";

export interface book {
    place : string,
    date : Date,
    provname : string
}

export interface modelSchemauser {
    fbid : string,
    role : string,
    contact : number,
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
    nearby : {
        type : String,
        required : true
    }
})

const modelSchemaexpuser = model('VehycleUser', Userdetclient)

export default modelSchemaexpuser;