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
import serverseasor from './Routes/SearchSortCl';
import serverseasorsp from './Routes/SearSorSup';

dotenv.config();  

const app = new Hono() 

app.use(logger())
app.use(poweredBy())

app.use('/*', cors()) 

connectDB(); 

app.get('/', (c) => {
  return c.text(`Hono Server Started at localhost or production`)
})

app.route("/userpr/",serverpr);
app.route("/usercl/",servercl);
app.route("/book/",bookcl);
app.route("/book/",bookpr);
app.route("/seasor/",serverseasor);
app.route("/seasor/",serverseasorsp);

app.onError((err : any, c : any) => {
    return c.text(`App error happened ${err}`);
})

export default app.fetch;