import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono()

const port : number | undefined = (process.env.PRODUCTION === 'production') ? Number(process.env.PRODSERVE) : Number (process.env.PORT)

console.log(`Server is running on port ${port}`)

app.get('/', (c) => {
  return c.text(`Hono Server Started at localhost:${port}`)
})

serve({
  fetch: app.fetch,
  port 
})