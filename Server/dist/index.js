"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const dotenv_1 = __importDefault(require("dotenv"));
const Routemonpr_1 = __importDefault(require("./Routes/Routemonpr"));
const Routemoncl_1 = __importDefault(require("./Routes/Routemoncl"));
const Bookingcl_1 = __importDefault(require("./Bookings/Bookingcl"));
const Bookingpr_1 = __importDefault(require("./Bookings/Bookingpr"));
const Mongo_1 = __importDefault(require("./Mongo"));
const cors_1 = require("hono/cors");
const powered_by_1 = require("hono/powered-by");
const logger_1 = require("hono/logger");
const SearchSortCl_1 = __importDefault(require("./Routes/SearchSortCl"));
const SearSorSup_1 = __importDefault(require("./Routes/SearSorSup"));
dotenv_1.default.config();
const app = new hono_1.Hono();
app.use((0, logger_1.logger)());
app.use((0, powered_by_1.poweredBy)());
const frontendurl = (String(process.env.PRODUCTION) === 'production') ? "https://vehycle.vercel.app" : 'http://localhost:5173';
app.use('/*', (0, cors_1.cors)());
const port = (process.env.PRODUCTION === 'production') ? 8888 : Number(process.env.PORT);
console.log(`Server is running on port ${port}`);
app.get('/', (c) => {
    return c.text(`Hono Server Started at localhost or production`);
});
(0, Mongo_1.default)();
app.route("/userpr/", Routemonpr_1.default);
app.route("/usercl/", Routemoncl_1.default);
app.route("/book/", Bookingcl_1.default);
app.route("/book/", Bookingpr_1.default);
app.route("/seasor/", SearchSortCl_1.default);
app.route("/seasor/", SearSorSup_1.default);
app.onError((err, c) => {
    return c.text(`App error happened ${err}`);
});
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
//# sourceMappingURL=index.js.map