import { Hono } from "hono";
import modelSchemaexpuser from '../Schema/Clientschema'

const servercl = new Hono();

const addBookingToProvider = async (clfbid: string, bookingDetails: any) => {
    try {
      const booking = {
        place: bookingDetails.place,
        date: bookingDetails.date,
        provname: bookingDetails.provname,
      };
  
      await modelSchemaexpuser.updateOne(
        { fbid: clfbid },
        { $push: { bookingscl: booking } }
      );
  
      console.log('Booking added to provider successfully');
    } catch (error) {
      console.error('Error adding booking to provider:', error);
      throw error;
    }
  };
  
  servercl.put('/bookingcl/:id', async (c) => {
    const clfbid = c.req.param('id');
    const { bookingDetails } = await c.req.json();
  
    if (!bookingDetails) {
      return c.json({ error: 'Booking details are required.' }, 400);
    }
  
    try {
      const provider = await modelSchemaexpuser.findOne({ fbid: clfbid });
  
      if (!provider) {
        return c.json({ error: 'Provider not found.' }, 404);
      }
  
      await addBookingToProvider(clfbid, bookingDetails);
      return c.json({ message: 'Booking added to provider successfully' });
    } catch (error) {
      return c.json({ error: 'An error occurred while adding the booking.' }, 500);
    }
  });

  export default servercl;