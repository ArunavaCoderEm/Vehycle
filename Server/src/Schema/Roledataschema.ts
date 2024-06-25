import { Schema, model } from "mongoose";

export interface bookpr {
    place : string,
    date : Date,
    clientname : string
}

export interface modelSchemaprov {
    fbid : string,
    role : string,
    contact : number,
    specialist ? : string,
    hourlyrate ? : number,
    desc ? : string,
    nearby : string,
    available ? : boolean,
    rating ? : number[],
    bookings : bookpr[] | null
}

const Userdetprov = new Schema <modelSchemaprov> ({
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
        type: [],
        default : [0]
    },
    bookings: {
        type: [{
            place: String,
            date: Date,
            provname: String,
        },],    
        default: []
    }
})

const modelSchemaexpprov = model('Vehycleprov', Userdetprov)

export default modelSchemaexpprov;