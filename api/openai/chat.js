export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { question, context = '' } = req.body || {}
    if (!question) return res.status(400).json({ error: 'question required' })

    const OPENAI_KEY = process.env.OPENAI_API_KEY
    if (!OPENAI_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })

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

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!r.ok) {
      const txt = await r.text()
      console.error('OpenAI error', r.status, txt)
      return res.status(502).json({ error: 'OpenAI error', details: txt })
    }

    const json = await r.json()
    const answer = json.choices?.[0]?.message?.content || ''
    res.status(200).json({ answer, raw: json })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal' })
  }
}
