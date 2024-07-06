import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import serverpr from './Routes/Routemonpr';
import servercl from './Routes/Routemoncl';
import bookcl from './Bookings/Bookingcl'
import bookpr from './Bookings/Bookingpr' 
import connectDB from './Mongo';
import { cors } from 'hono/cors';
import { poweredBy } from 'hono/powered-by';
import { logger } from 'hono/logger';

dotenv.config();  

const app = new Hono() 
   
app.use(logger())

app.use(poweredBy())

const frontendurl = (String(process.env.PRODUCTION) === 'production') ? "https://vehycle.vercel.app" : 'http://localhost:5173';

app.use('/*', cors()) 

const port = (process.env.PRODUCTION === 'production') ? undefined : Number(process.env.PORT);

console.log(`Server is running on port ${port}`)

app.get('/', (c) => {
  return c.text(`Hono Server Started at localhost or production`)
})

connectDB(); 

app.route("/userpr/",serverpr);

app.route("/usercl/",servercl);

app.route("/book/",bookcl);

app.route("/book/",bookpr);

app.onError((err : any, c : any) => {
    return c.text(`App error happened ${err}`);
})

serve({
  fetch: app.fetch,
  port 
})