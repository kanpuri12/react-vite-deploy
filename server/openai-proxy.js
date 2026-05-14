/*
  Example Express proxy for OpenAI — run this alongside your static front-end.
  IMPORTANT: keep your OPENAI_API_KEY on the server. Do NOT expose it in the browser.

  Install dependencies in a small server folder:
    npm init -y
    npm i express node-fetch cors

  Run:
    OPENAI_API_KEY=sk-... node server/openai-proxy.js

  This is a minimal, non-production-ready example. Add rate-limiting, auth and request validation before deploying.
*/

const express = require('express')
// Prefer native global fetch (Node 18+). If not available, try undici, otherwise dynamically import node-fetch.
let fetchFn
if (typeof global.fetch === 'function') {
  fetchFn = global.fetch.bind(global)
  console.log('OpenAI proxy: using global.fetch')
} else {
  // Prefer a direct require of node-fetch (works with node-fetch v2 or v3 via .default)
  try {
    const nf = require('node-fetch')
    fetchFn = nf && (nf.default || nf)
    console.log('OpenAI proxy: using node-fetch (require)')
  } catch (err1) {
    try {
      // Try undici
      const { fetch: undiciFetch } = require('undici')
      fetchFn = undiciFetch
      console.log('OpenAI proxy: using undici.fetch')
    } catch (err2) {
      // Fallback to dynamic import of node-fetch
      fetchFn = async (...args) => {
        const mod = await import('node-fetch')
        const fn = mod && (mod.default || mod)
        console.log('OpenAI proxy: using node-fetch (dynamic import)')
        return fn(...args)
      }
    }
  }
}
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080
const OPENAI_KEY = process.env.OPENAI_API_KEY

if (!OPENAI_KEY) {
  console.warn('WARNING: OPENAI_API_KEY not set — proxy will not work until you set it in the environment')
}

app.post('/api/openai/chat', async (req, res) => {
  try {
    const { question, context = '' } = req.body
    if (!question) return res.status(400).json({ error: 'question required' })

    // Build prompt: tell model to prioritize the provided context when answering
    const system = `You are an assistant that answers user questions based on the website content provided in the 'context' field. Use the context to answer precisely and cite "(source)" if needed. If context doesn't contain the answer, be honest and say you don't know.`
    const messages = [
      { role: 'system', content: system },
      { role: 'user', content: `Context:\n${context}` },
      { role: 'user', content: `Question: ${question}` },
    ]

    const payload = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.1,
      max_tokens: 800,
    }

    const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('OpenAI error', response.status, text)
      return res.status(502).json({ error: 'OpenAI error', details: text })
    }

    const json = await response.json()
    const answer = json.choices?.[0]?.message?.content || ''
    res.json({ answer, raw: json })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
})

app.listen(PORT, () => console.log(`OpenAI proxy listening on http://localhost:${PORT}`))
