import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import server from './Routes/Routemon';
import connectDB from './Mongo';
import { cors } from 'hono/cors'

dotenv.config();  

const app = new Hono() 

const frontendurl : string = (String(process.env.PRODUCTION) === 'production') ? "https://example.vercel.app" : 'http://locahost:5173'

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
  return c.text(`Hono Server Started at localhost:${port}`)
})

connectDB(); 

app.route("/users/",server);

serve({
  fetch: app.fetch,
  port 
})