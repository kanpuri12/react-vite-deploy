import api from './api'

// askAI sends user's question and a site-context snapshot to the server-side OpenAI proxy
export const askAI = async (question, context = '') => {
  const payload = { question, context }
  const res = await api.post('/openai/chat', payload)
  return res.data
}

export default { askAI }
