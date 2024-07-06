import { Hono } from "hono";
import modelSchemaexpuser from '../Schema/Clientschema'

const servercl = new Hono();

servercl.get("/getdata", async (c) => {
    try{
        const res = await modelSchemaexpuser.find()
        if(!res){
            console.log(`Document doesn't exist`);
            return c.json(
                { message: false }, 404
            );  
        }
        return c.json(
            res.map((r) => r.toObject()), 201
        )
    }
    catch (error) {
        return c.json(
            { message: `Internal server error` },
            500
        ); 
    }
})

servercl.get("/getpart/:query", async (c) => {
    try {
        const par = c.req.param('query')
        const res = await modelSchemaexpuser.find({ fbid : par })
        if(!res.length){
            console.log(`Document doesn't exist`);
            return c.json(
                { message: false }, 404
            );  
        }
        return c.json(
            res, 201
        )
    }
    catch (error) {
        return c.json(
            { message: `Internal server error` },
            500
        ); 
    }
})

servercl.post("/create", async (c) => {
    try {
        const res = await c.req.json();
        const par = await res.fbid;
        const exi = await modelSchemaexpuser.findOne({ fbid : par });
        if(exi){
            return c.json(
                `${par} already exists`, 500
            )
        }
        const docs = new modelSchemaexpuser(res)
        const docres = docs.save()
        return c.json((await docres).toObject(), 201)
    }
    catch (error) {
        return c.json(
            { message: `Internal server error` },
            500
        ); 
    }
})

servercl.delete("/delete/:id", async (c) => {
    try {
        const par = c.req.param('id'); 
        const res = await modelSchemaexpuser.findOneAndDelete({ fbid: par }); 
        if (!res) {
            console.log(`Document with fbid ${par} doesn't exist`);
            return c.json(
                { message: `Document with fbid ${par} doesn't exist` },
                404
            );  
        }
        return c.json(
            { message: `Document with fbid ${par} deleted successfully` },
            200
        ); 
    } catch (error) {
        return c.json(
            { message: `Internal server error` },
            500
        ); 
    }
});

servercl.put("/update/:id", async (c) => {
    try {
        const par = c.req.param('id'); 
        const resdocs = await c.req.json();
        const res = await modelSchemaexpuser.findOneAndUpdate({ fbid: par }, resdocs, { new : true }); 
        if (!res) {
            console.log(`Document with fbid ${par} doesn't exist`);
            return c.json(
                { message: `Document with fbid ${par} doesn't exist` },
                404
            );  
        }
        return c.json(
            { message: `Document with fbid ${par} updated successfully`, resdocs },
            200
        ); 
    } catch (error) {
        return c.json(
            { message: `Internal server error` },
            500
        ); 
    }
});

export default servercl;