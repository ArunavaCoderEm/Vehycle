import { Hono } from "hono";
import modelSchemaexpprov from "../Schema/Roledataschema";

const serverpr = new Hono();

serverpr.get("/getdata", async (c) => {
    try{
        const res = await modelSchemaexpprov.find()
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

serverpr.get("/getpart/:query", async (c) => {
    try {
        const par = c.req.param('query')
        const res = await modelSchemaexpprov.find({ fbid : par })
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

serverpr.post("/create", async (c) => {
    try {
        const res = await c.req.json();
        const par = await res.fbid;
        const exi = await modelSchemaexpprov.findOne({ fbid : par });
        if(exi){
            return c.json(
                `${par} already exists`, 500
            )
        }
        const docs = new modelSchemaexpprov(res)
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

serverpr.delete("/delete/:id", async (c) => {
    try {
        const par = c.req.param('id'); 
        const res = await modelSchemaexpprov.findOneAndDelete({ fbid: par }); 
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

serverpr.put("/update/:id", async (c) => {
    try {
        const par = c.req.param('id'); 
        const resdocs = await c.req.json();
        const res = await modelSchemaexpprov.findOneAndUpdate({ fbid: par }, resdocs, { new : true }); 
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

export default serverpr;