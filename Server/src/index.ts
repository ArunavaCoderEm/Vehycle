import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hono Server Started at localhost:8173')
})

const port = 8173
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})