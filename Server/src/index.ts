import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';
import server from './Routes/Routemon';
import connectDB from './Mongo'

dotenv.config();  

const app = new Hono() 

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