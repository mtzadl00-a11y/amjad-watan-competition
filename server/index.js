import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
const app = express()
app.use(bodyParser.json())
const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
const ADMIN_PASS = process.env.ADMIN_PASS

app.post('/admin/delete', async (req,res)=>{
  const { pass, id } = req.body
  if(pass !== ADMIN_PASS) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/participants?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if(!resp.ok){
      const text = await resp.text()
      return res.status(500).json({ error: 'delete failed', detail: text })
    }
    res.json({ ok:true })
  } catch(e){
    res.status(500).json({ error: 'server error' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log('Admin server listening on', port))
