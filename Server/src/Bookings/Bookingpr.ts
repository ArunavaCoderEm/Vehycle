import { Hono } from 'hono';
import modelSchemaexpuser from '../Schema/Clientschema';
import modelSchemaexpprov from '../Schema/Roledataschema';
import { ObjectId } from 'mongodb';

const Bookingspr = new Hono();

Bookingspr.put('/bookingpr/:cid/:pid', async (c) => {
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

      await modelSchemaexpuser.updateOne(
        { fbid: cid },
        { $push: { bookingscl: consumerBooking } }
      );

      await modelSchemaexpprov.updateOne(
        { fbid: pid },
        { $push: { bookings: providerBooking } }
      );

      return c.json({ message: 'Success', providerBookingId: providerBookingId.toString(), consumerBookingId: consumerBookingId.toString() });
    }
  } catch (e) {
    console.error('Error updating documents:', e);
    return c.json({ message: 'Error' }, 500);
  }
});

Bookingspr.post('/confirm', async (c) => {
  const { bookingId, confirm } = await c.req.json<{ bookingId: string; confirm: string }>();

  try {
    const providerBooking = await modelSchemaexpprov.findOne({ 'bookings._id': new ObjectId(bookingId) });

    if (!providerBooking) {
      return c.json({ message: 'Booking not found' }, 404);
    }

    const bookingIndex = providerBooking.bookings.findIndex(booking => booking._id.toString() === bookingId);
    const consumerBookingId = providerBooking.bookings[bookingIndex].consumerBookingId;

    const consumerBooking = await modelSchemaexpuser.findOne({ 'bookingscl._id': new ObjectId(consumerBookingId) });

    if (!consumerBooking) {
      return c.json({ message: 'Consumer booking not found' }, 404);
    }

    const consumerBookingIndex = consumerBooking.bookingscl.findIndex(booking => booking._id.toString() === consumerBookingId.toString());

    if (confirm === 'yes') {
      providerBooking.bookings[bookingIndex].status = 'confirmed';
      consumerBooking.bookingscl[consumerBookingIndex].status = 'confirmed';
    } else {
      providerBooking.bookings.splice(bookingIndex, 1);
      consumerBooking.bookingscl.splice(consumerBookingIndex, 1);
    }

    await providerBooking.save();
    await consumerBooking.save();

    return c.json({ message: `Booking ${confirm === 'yes' ? 'confirmed' : 'rejected'}` });
  } catch (e) {
    console.error('Error confirming booking:', e);
    return c.json({ message: 'Error' }, 500);
  }
});

export default Bookingspr;
