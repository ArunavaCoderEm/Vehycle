"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const Roledataschema_1 = __importDefault(require("../Schema/Roledataschema"));
const serverseasor = new hono_1.Hono();
serverseasor.get("/getmech/:id", async (c) => {
    try {
        const par = c.req.param('id');
        const res = await Roledataschema_1.default.find({ specialist: par });
        if (!res.length) {
            console.log(`Document doesn't exist`);
            return c.json({ message: false }, 201);
        }
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
serverseasor.get("/nearyou/:id", async (c) => {
    try {
        const par = c.req.param('id');
        const res = await Roledataschema_1.default.find({ pin: par });
        if (!res.length) {
            console.log(`Document doesn't exist`);
            return c.json({ message: false }, 201);
        }
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
});
exports.default = serverseasor;
//# sourceMappingURL=SearchSortCl.js.map