"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const Roledataschema_1 = __importDefault(require("../Schema/Roledataschema"));
const serverpr = new hono_1.Hono();
serverpr.get("/getdata", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield Roledataschema_1.default.find();
        if (!res) {
            console.log(`Document doesn't exist`);
            return c.json(`Document doesn't exist`, 404);
        }
        return c.json(res.map((r) => r.toObject()), 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
}));
serverpr.get("/getpart/:query", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const par = c.req.param('query');
        const res = yield Roledataschema_1.default.find({ fbid: par });
        if (!res.length) {
            console.log(`Document doesn't exist`);
            return c.json(`Document doesn't exist`, 404);
        }
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
}));
serverpr.post("/create", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield c.req.json();
        const par = yield res.fbid;
        const exi = yield Roledataschema_1.default.findOne({ fbid: par });
        if (exi) {
            return c.json(`${par} already exists`, 500);
        }
        const docs = new Roledataschema_1.default(res);
        const docres = docs.save();
        return c.json((yield docres).toObject(), 201);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
}));
serverpr.delete("/delete/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const par = c.req.param('id');
        const res = yield Roledataschema_1.default.findOneAndDelete({ fbid: par });
        if (!res) {
            console.log(`Document with fbid ${par} doesn't exist`);
            return c.json({ message: `Document with fbid ${par} doesn't exist` }, 404);
        }
        return c.json({ message: `Document with fbid ${par} deleted successfully` }, 200);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
}));
serverpr.put("/update/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const par = c.req.param('id');
        const resdocs = yield c.req.json();
        const res = yield Roledataschema_1.default.findOneAndUpdate({ fbid: par }, resdocs, { new: true });
        if (!res) {
            console.log(`Document with fbid ${par} doesn't exist`);
            return c.json({ message: `Document with fbid ${par} doesn't exist` }, 404);
        }
        return c.json({ message: `Document with fbid ${par} updated successfully`, resdocs }, 200);
    }
    catch (error) {
        return c.json({ message: `Internal server error` }, 500);
    }
}));
exports.default = serverpr;
