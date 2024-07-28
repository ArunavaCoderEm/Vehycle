import { Hono } from "hono";
import modelSchemaexpuser from '../Schema/Clientschema'
import modelSchemaexpprov from '../Schema/Roledataschema'

const Bookingspr = new Hono();
  
Bookingspr.put('/bookingpr/:cid/:pid', async (c) => {

    const cid = c.req.param('cid');
    const pid = c.req.param('pid');
    const { date } = await c.req.json(); 
  
    try {
    
      const consumerExists = await modelSchemaexpuser.findOne({ fbid: cid });
     
      const providerExists = await modelSchemaexpprov.findOne({ fbid: pid });
  
      if (!consumerExists || !providerExists) {
        console.log(`Document doesn't exist`);
        return c.json({ message: false }, 404);
      }
  
    else{

      const provname = providerExists.name;
      const provimg = providerExists.img;
     
      const cliname = consumerExists.name;
      const cliimg = consumerExists.img;
     
      const place = consumerExists.nearby;
  
     
      const consumerBooking = {
        place: place,
        date: date,
        provname: provname,
        provFbid: pid,
        imgpr: provimg,
      };
  
      
      const providerBooking = {
        place: place,
        date: date,
        clientname: cliname,
        clientFbid: cid,
        imgcl : cliimg,
      };
  
    
      await modelSchemaexpuser.updateOne(
        { fbid: cid },
        { $push: { bookingscl: consumerBooking } }
      );
  
      
      await modelSchemaexpprov.updateOne(
        { fbid: pid },
        { $push: { bookings: providerBooking } }
      );
  
      return c.json({ message: 'Success' });
      
    }

    } catch (e) {
      console.error('Error updating documents:', e);
      return c.json({ message: false }, 500);
    }
  });

  export default Bookingspr;