import { Hono } from "hono";

const server = new Hono();

server.get("/getdata", async (c) => {
    const res = 
})

server.get("/getpart/:query", async (c) => {
    
})

server.post("/create", async (c) => {
    
})

server.delete("/delete/:id", async (c) => {
    
})

server.put("/put/:id", async (c) => {
    
})

export default server;