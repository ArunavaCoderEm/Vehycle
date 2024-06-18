import { Hono } from "hono";
import modelSchemaexpprov from "../Schema/Roledataschema";
import { isValidObjectId } from "mongoose";

const servercl = new Hono();

servercl.get("/getdata", async (c) => {
    const res = await modelSchemaexpprov.find()
    if(!res){
        console.log(`Document doesn't exist`);
        return c.json(
            `Document doesn't exist`,404
        );  
    }
    return c.json(
        res.map((r) => r.toObject()), 201
    )
})

servercl.get("/getpart/:query", async (c) => {
    const par = c.req.param('query')
    if(!isValidObjectId(par)){
        console.log(`${par} doesn't exist`);
        return c.json(
            `${par} doesn't exist`,400
        );
    }
    const res = await modelSchemaexpprov.findById(par)
    if(!res){
        console.log(`Document doesn't exist`);
        return c.json(
            `Document doesn't exist`,404
        );  
    }
    return c.json(
        res.toObject(), 201
    )
})

servercl.post("/create", async (c) => {
    const res = await c.req.json();
    const docs = new modelSchemaexpprov(res)
    const docres = docs.save()
    return c.json((await docres).toObject(), 201)
})

servercl.delete("/delete/:id", async (c) => {
    const par = c.req.param('id')
    if(!isValidObjectId(par)){
        console.log(`${par} doesn't exist`);
        return c.json(
            `${par} doesn't exist`,400
        );
    }
    const res = await modelSchemaexpprov.findByIdAndDelete(par)
    if(!res){
        console.log(`Document doesn't exist`);
        return c.json(
            `Document doesn't exist`,404
        );  
    }
    return c.json(
        `${par} id deleted`, 201
    )
})

servercl.put("/put/:id", async (c) => {
    const par = c.req.param('id')
    if(!isValidObjectId(par)){
        console.log(`${par} doesn't exist`);
        return c.json(
            `${par} doesn't exist`,400
        );
    }
    const docs = c.req.json()
    const updocs = await modelSchemaexpprov.findByIdAndUpdate(par, docs, { new : true })
    return c.json(
        updocs?.toObject(), 200
    )
})

export default servercl;