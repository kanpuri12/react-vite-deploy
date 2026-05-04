// src/hooks/useScrollAnimation.js
import { useInView } from 'react-intersection-observer'

/**
 * Returns { ref, inView } — attach ref to the element you want to animate.
 * The element becomes visible once it enters the viewport.
 */
export function useScrollAnimation(threshold = 0.15) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })
  return { ref, inView }
}

// src/hooks/useContact.js
import { useState } from 'react'
import { sendContactMessage } from '../services/api'

export function useContact() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState(null)

  const submit = async (formData) => {
    setStatus('loading')
    setError(null)
    try {
      await sendContactMessage(formData)
      setStatus('success')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const reset = () => { setStatus('idle'); setError(null) }

  return { submit, status, error, reset }
}
