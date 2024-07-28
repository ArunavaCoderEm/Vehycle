import { Hono } from 'hono';
import modelSchemaexpuser from '../Schema/Clientschema';
import modelSchemaexpprov from '../Schema/Roledataschema';
import { ObjectId } from 'mongodb';

const Bookingcl = new Hono();

Bookingcl.put('/bookingcl/:cid/:pid', async (c) => {
  const cid = c.req.param('cid');
  const pid = c.req.param('pid');
  const { date } = await c.req.json<{ date: string }>();

  try {
    const consumerExists = await modelSchemaexpuser.findOne({ fbid: cid });
    const providerExists = await modelSchemaexpprov.findOne({ fbid: pid });

    if (!consumerExists || !providerExists) {
      console.log(`Document doesn't exist`);
      return c.json({ message: 'User not found' }, 404);
    } else {
      const provname = providerExists.name;
      const provimg = providerExists.img;
      const cliname = consumerExists.name;
      const cliimg = consumerExists.img;
      const place = consumerExists.nearby;

      const consumerBookingId = new ObjectId();
      const providerBookingId = new ObjectId();

      const consumerBooking = {
        _id: consumerBookingId,
        place: place,
        date: date,
        provname: provname,
        provFbid: pid,
        imgpr: provimg,
        status: 'pending',
        providerBookingId: providerBookingId
      };

      const providerBooking = {
        _id: providerBookingId,
        place: place,
        date: date,
        clientname: cliname,
        clientFbid: cid,
        imgcl: cliimg,
        status: 'pending',
        consumerBookingId : consumerBookingId
      };
 
      const providerNotf = {
        place : place,
        date : date,
        clientname : cliname,
        providerBookingId : providerBookingId,
        consumerBookingId : consumerBookingId
      }

      await modelSchemaexpuser.updateOne(
        { fbid: cid },
        { $push: { bookingscl: consumerBooking } }
      );

      await modelSchemaexpprov.updateOne(
        { fbid: pid },
        { $push: { bookings: providerBooking } }
      );

      await modelSchemaexpprov.updateOne(
        { fbid: pid },
        { $push: { notification: providerNotf } }
      );

      return c.json({ message: 'Success', providerBookingId: providerBookingId.toString(), consumerBookingId: consumerBookingId.toString() });
    }
  } catch (e) {
    console.error('Error updating documents:', e);
    return c.json({ message: 'Error' }, 500);
  }
});

Bookingcl.post('bookcl/confirm', async (c) => {
  const { bookingId, confirm } = await c.req.json<{ bookingId: string; confirm: string }>();

  try {
    const consumerBooking = await modelSchemaexpuser.findOne({ 'bookingscl._id': new ObjectId(bookingId) });

    if (!consumerBooking) {
      return c.json({ message: 'Booking not found' }, 404);
    }

    const bookingIndex = consumerBooking.bookingscl.findIndex(booking => booking._id.toString() === bookingId);
    const providerBookingId = consumerBooking.bookingscl[bookingIndex].providerBookingId;

    const providerBooking = await modelSchemaexpprov.findOne({ 'bookings._id': new ObjectId(providerBookingId) });

    if (!providerBooking) {
      return c.json({ message: 'Provider booking not found' }, 404);
    }

    const providerBookingIndex = providerBooking.bookings.findIndex(booking => booking._id.toString() === providerBookingId.toString());

    if (confirm === 'yes') {
      consumerBooking.bookingscl[bookingIndex].status = 'confirmed';
      providerBooking.bookings[providerBookingIndex].status = 'confirmed';
    } else {
      consumerBooking.bookingscl[bookingIndex].status = 'rejected';
      providerBooking.bookings[providerBookingIndex].status = 'rejected';
    }

    await consumerBooking.save();
    await providerBooking.save();

    return c.json({ message: `Booking ${confirm === 'yes' ? 'confirmed' : 'rejected'}` });
  } catch (e) {
    console.error('Error confirming booking:', e);
    return c.json({ message: 'Error' }, 500);
  }
});

export default Bookingcl;