import { Hono } from "hono";

const server = new Hono();

server.get("/add", async (c) => {
    return c.text("useradd hono")
})

server.get("/delete", async (c) => {
    return c.text("userdelete hono")
})

export default server;