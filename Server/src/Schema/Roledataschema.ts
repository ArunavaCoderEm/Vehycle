import { Schema, model } from "mongoose";

export interface bookpr {
    place : string,
    date : Date,
    clientname : string,
    clientFbid : string,
    imgcl : string,
    status : string,
    contact:number
    _id : string,
    def : string,
    consumerBookingId : string
}

export interface notif {
    place : string,
    date : Date,
    clientname : string,
    def : string,
    providerBookingId : string,
    consumerBookingId : string
}

export interface modelSchemaprov {
    fbid : string,
    role : string,
    name : string,
    img : string,
    contact : number,
    specialist ? : string,
    hourlyrate ? : number,
    desc ? : string,
    nearby : string,
    pin : number,
    available ? : boolean,
    notification : notif[]
    rating ? : number[],
    bookings: bookpr[]
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
    name : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true,
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
    pin : {
        type : Number,
        required : true
    },
    available : {
        type : Boolean,
        default : true
    },
    rating : {
        type: [Number],
        default : [0]
    },
    notification : {
        type: [{
            place: String,
            date: Date,
            def : String,
            clientname: String,
            consumerBookingId : String, 
            providerBookingId : String, 
        },],
        default: []
    },
    bookings: {
        type: [{
            place: String,
            date: Date,
            clientname: String,
            clientFbid: String,
            imgcl : String,  
            status : String,
            _id : String,
            consumerBookingId : String,
            contact: Number,
            def : String  
        },],
        default: []
    }
})

const modelSchemaexpprov = model('Vehycleprov', Userdetprov)

export default modelSchemaexpprov;