import { Hono } from "hono";
import modelSchemaexpuser from "../Schema/Clientschema";

const serverseasorsp = new Hono();

serverseasorsp.get("/getclient/:id", async (c) => {
    try {
        const par = c.req.param('id')
        const res = await modelSchemaexpuser.find({ specialist : par })
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

serverseasorsp.get("/nearyousp/:id", async (c) => {
    try {
        const par = c.req.param('id')
        const res = await modelSchemaexpuser.find({ pin : par })
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


export default serverseasorsp;