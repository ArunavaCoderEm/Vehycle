import { Schema, model } from "mongoose";

export interface modelSchema {
    fbid : string,
    role : string,
    contact : number,
    specialist ? : string,
    hourlyrate ? : number,
    desc ? : string,
    nearby : string,
    available ? : boolean,
    rating ? : number[]
}

const Userdet = new Schema <modelSchema> ({
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
    specialist : {
        type : String,
        required : true,
        default : 'cleaner'
    },
    hourlyrate : {
        type : Number,
        default : 229
    },
    desc : {
        type : String,
        required : true
    },
    nearby : {
        type : String,
        required : true
    },
    available : {
        type : Boolean,
        default : true
    },
    rating : {
        type: [Number],
        default : [0]
    }
})

const modelSchemaexp = model('VehycleUser', Userdet)

export default modelSchemaexp;