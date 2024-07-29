"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const Roledataschema_1 = __importDefault(require("../Schema/Roledataschema"));
const serverpr = new hono_1.Hono();
serverpr.get("/getdata", async (c) => {
    try {
        const res = await Roledataschema_1.default.find();
        if (!res) {
            console.log(`Document doesn't exist`);
            return c.json({ message: false }, 404);
        }
        return c.json(res.map((r) => r.toObject()), 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
serverpr.get("/getpart/:query", async (c) => {
    try {
        const par = c.req.param('query');
        const res = await Roledataschema_1.default.find({ fbid: par });
        if (!res.length) {
            console.log(`Document doesn't exist`);
            return c.json({ message: false }, 404);
        }
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
serverpr.post("/create", async (c) => {
    try {
        const res = await c.req.json();
        const par = await res.fbid;
        const exi = await Roledataschema_1.default.findOne({ fbid: par });
        if (exi) {
            return c.json(`${par} already exists`, 500);
        }
        const docs = new Roledataschema_1.default(res);
        const docres = docs.save();
        return c.json((await docres).toObject(), 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
serverpr.delete("/delete/:id", async (c) => {
    try {
        const par = c.req.param('id');
        const res = await Roledataschema_1.default.findOneAndDelete({ fbid: par });
        if (!res) {
            console.log(`Document with fbid ${par} doesn't exist`);
            return c.json({ message: `Document with fbid ${par} doesn't exist` }, 404);
        }
        return c.json({ message: `Document with fbid ${par} deleted successfully` }, 200);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
serverpr.put("/update/:id", async (c) => {
    try {
        const par = c.req.param('id');
        const resdocs = await c.req.json();
        const res = await Roledataschema_1.default.findOneAndUpdate({ fbid: par }, resdocs, { new: true });
        if (!res) {
            console.log(`Document with fbid ${par} doesn't exist`);
            return c.json({ message: `Document with fbid ${par} doesn't exist` }, 404);
        }
        return c.json({ message: `Document with fbid ${par} updated successfully`, resdocs }, 200);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
exports.default = serverpr;
