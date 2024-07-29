"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const Clientschema_1 = __importDefault(require("../Schema/Clientschema"));
const serverseasorsp = new hono_1.Hono();
serverseasorsp.get("/getclient/:id", async (c) => {
    try {
        const par = c.req.param('id');
        const res = await Clientschema_1.default.find({ current_defect: par });
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
serverseasorsp.get("/nearyousp/:id", async (c) => {
    try {
        const par = c.req.param('id');
        const res = await Clientschema_1.default.find({ pin: par });
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
exports.default = serverseasorsp;
//# sourceMappingURL=SearSorSup.js.map