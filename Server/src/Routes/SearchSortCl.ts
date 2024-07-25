import { Hono } from "hono";
import modelSchemaexpprov from "../Schema/Roledataschema";

const serverseasor = new Hono();

serverseasor.get("/getmech/:id", async (c) => {
    try {
        const par = c.req.param('id')
        const res = await modelSchemaexpprov.find({ specialist : par })
        if(!res.length){
            console.log(`Document doesn't exist`);
            return c.json(
                { message: false }, 201
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

serverseasor.get("/nearyou/:id", async (c) => {
    try {
        const par = c.req.param('id')
        const res = await modelSchemaexpprov.find({ pin : par })
        if(!res.length){
            console.log(`Document doesn't exist`);
            return c.json(
                { message: false }, 201
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


export default serverseasor;