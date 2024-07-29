"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const Clientschema_1 = __importDefault(require("../Schema/Clientschema"));
const Roledataschema_1 = __importDefault(require("../Schema/Roledataschema"));
const mongodb_1 = require("mongodb");
const Bookingcl = new hono_1.Hono();
Bookingcl.put('/bookingcl/:cid/:pid', async (c) => {
    const cid = c.req.param('cid');
    const pid = c.req.param('pid');
    const { date } = await c.req.json();
    try {
        const consumerExists = await Clientschema_1.default.findOne({ fbid: cid });
        const providerExists = await Roledataschema_1.default.findOne({ fbid: pid });
        if (!consumerExists || !providerExists) {
            console.log(`Document doesn't exist`);
            return c.json({ message: 'User not found' }, 404);
        }
        else {
            const provname = providerExists.name;
            const provcon = providerExists.contact;
            const provimg = providerExists.img;
            const cliname = consumerExists.name;
            const clicon = consumerExists.contact;
            const cliimg = consumerExists.img;
            const place = consumerExists.nearby;
            const clidef = consumerExists.current_defect;
            const provspe = providerExists.specialist;
            const consumerBookingId = new mongodb_1.ObjectId();
            const providerBookingId = new mongodb_1.ObjectId();
            const consumerBooking = {
                _id: consumerBookingId,
                place: place,
                date: date,
                provname: provname,
                provFbid: pid,
                spe: provspe,
                imgpr: provimg,
                contact: provcon,
                status: 'pending',
                providerBookingId: providerBookingId
            };
            const providerBooking = {
                _id: providerBookingId,
                place: place,
                date: date,
                def: clidef,
                clientname: cliname,
                clientFbid: cid,
                imgcl: cliimg,
                contact: clicon,
                status: 'pending',
                consumerBookingId: consumerBookingId
            };
            const providerNotf = {
                place: place,
                date: date,
                def: clidef,
                clientname: cliname,
                providerBookingId: providerBookingId,
                consumerBookingId: consumerBookingId
            };
            await Clientschema_1.default.updateOne({ fbid: cid }, { $push: { bookingscl: consumerBooking } });
            await Roledataschema_1.default.updateOne({ fbid: pid }, { $push: { bookings: providerBooking } });
            await Roledataschema_1.default.updateOne({ fbid: pid }, { $push: { notification: providerNotf } });
            return c.json({ message: 'Success', providerBookingId: providerBookingId.toString(), consumerBookingId: consumerBookingId.toString() });
        }
    }
    catch (e) {
        console.error('Error updating documents:', e);
        return c.json({ message: 'Error' }, 500);
    }
});
Bookingcl.post('bookcl/confirm', async (c) => {
    const { bookingId, confirm } = await c.req.json();
    try {
        const consumerBooking = await Clientschema_1.default.findOne({ 'bookingscl._id': new mongodb_1.ObjectId(bookingId) });
        if (!consumerBooking) {
            return c.json({ message: 'Booking not found' }, 404);
        }
        const bookingIndex = consumerBooking.bookingscl.findIndex(booking => booking._id.toString() === bookingId);
        const providerBookingId = consumerBooking.bookingscl[bookingIndex].providerBookingId;
        const providerBooking = await Roledataschema_1.default.findOne({ 'bookings._id': new mongodb_1.ObjectId(providerBookingId) });
        if (!providerBooking) {
            return c.json({ message: 'Provider booking not found' }, 404);
        }
        const providerBookingIndex = providerBooking.bookings.findIndex(booking => booking._id.toString() === providerBookingId.toString());
        if (confirm === 'yes') {
            consumerBooking.bookingscl[bookingIndex].status = 'confirmed';
            providerBooking.bookings[providerBookingIndex].status = 'confirmed';
        }
        else {
            consumerBooking.bookingscl[bookingIndex].status = 'rejected';
            providerBooking.bookings[providerBookingIndex].status = 'rejected';
        }
        await consumerBooking.save();
        await providerBooking.save();
        return c.json({ message: `Booking ${confirm === 'yes' ? 'confirmed' : 'rejected'}` });
    }
    catch (e) {
        console.error('Error confirming booking:', e);
        return c.json({ message: 'Error' }, 500);
    }
});
exports.default = Bookingcl;
//# sourceMappingURL=Bookingcl.js.map