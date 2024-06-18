import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import serverpr from './Routes/Routemonpr';
import servercl from './Routes/Routemoncl';
import connectDB from './Mongo';
import { cors } from 'hono/cors';
import { poweredBy } from 'hono/powered-by';
import { logger } from 'hono/logger';

dotenv.config();  

const app = new Hono() 

app.use(logger())

app.use(poweredBy())

const frontendurl : string = (String(process.env.PRODUCTION) === 'production') ? "https://vehycle.vercel.app" : 'http://localhost:5173'

app.use(
  '/*',
  cors({
    origin: frontendurl,
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

const port : number | undefined =  Number(process.env.PORT);

console.log(`Server is running on port ${port}`)

app.get('/', (c) => {
  return c.text(`Hono Server Started at localhost or production`)
})

connectDB(); 

app.route("/userpr/",serverpr);

app.route("/usercl/",servercl);

app.onError((err : any, c : any) => {
    return c.text(`App error happened ${err}`);
})

serve({
  fetch: app.fetch,
  port 
})