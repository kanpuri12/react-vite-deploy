// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Contact ──────────────────────────────────────
export const sendContactMessage = async (data) => {
  const res = await api.post('/api/contact', data)
  return res.data
}

// ── Blog ─────────────────────────────────────────
export const fetchBlogs = async (page = 0, size = 6) => {
  const res = await api.get('/blogs', { params: { page, size } })
  return res.data
}

export const fetchBlogById = async (id) => {
  const res = await api.get(`/blogs/${id}`)
  return res.data
}

// ── Resume ───────────────────────────────────────
export const downloadResume = () => {
  // If a backend API is configured (VITE_API_URL), use the API endpoint.
  // Otherwise fall back to a local static file `public/resume.pdf`.
  const apiBase = import.meta.env.VITE_API_URL || '/api'
  if (import.meta.env.VITE_API_URL) {
    window.open(`${apiBase}/resume/download`, '_blank')
  } else {
    // Vite serves files placed in the `public` directory at the project root.
    // Put your resume PDF at `public/resume.pdf` to make it available at '/resume.pdf'.
    window.open('/resume.pdf', '_blank')
  }
}

// ── Testimonials (optional server-side persistence) ─────────────────────
export const submitTestimonial = async (data) => {
  // POST to /testimonials on the configured API. Caller should handle errors.
  const res = await api.post('/testimonials', data)
  return res.data
}

export default api
