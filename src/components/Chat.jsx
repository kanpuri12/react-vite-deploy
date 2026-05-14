import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageSquare } from 'react-icons/fi'
import { askAI } from '../services/chat'
import styles from './Chat.module.css'

function getSiteContext() {
  // Lightweight context extractor: grabs title, meta description, and main text sections
  const title = document.title || ''
  const meta = document.querySelector('meta[name="description"]')?.content || ''
  const mainText = Array.from(document.querySelectorAll('main, section, article'))
    .map(n => n.innerText)
    .filter(Boolean)
    .join('\n\n')
  return `${title}\n${meta}\n\n${mainText}`.slice(0, 30_000) // cap size
}

export default function Chat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'sys', from: 'bot', text: "Hi — I'm the site assistant. Ask me about this site or the content on the pages." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const q = input.trim()
    const userMsg = { id: Date.now().toString(), from: 'user', text: q }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const context = getSiteContext()
      const res = await askAI(q, context)
      const botText = res?.answer || 'Sorry, I could not generate a response.'
      setMessages(m => [...m, { id: `bot-${Date.now()}`, from: 'bot', text: botText }])
    } catch (err) {
      setMessages(m => [...m, { id: `bot-err-${Date.now()}`, from: 'bot', text: 'Error contacting the assistant. Please try again later.' }])
      console.error('chat error', err)
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send()
  }

  return (
    <div className={`${styles.widget} ${open ? styles.open : ''}`} aria-live="polite">
      <div className={styles.handle} onClick={() => setOpen(o => !o)}>
        <FiMessageSquare size={18} />
        <span className={styles.handleLabel}>Chat</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          >
            <div className={styles.header}>
              <strong>Site Assistant</strong>
              <small>Answers based on this site's content</small>
            </div>

            <div className={styles.messages} ref={containerRef}>
              {messages.map(msg => (
                <div key={msg.id} className={`${styles.msg} ${msg.from === 'bot' ? styles.bot : styles.user}`}>
                  <div className={styles.bubble}>{msg.text}</div>
                </div>
              ))}
              {loading && (
                <div className={`${styles.msg} ${styles.bot}`}>
                  <div className={styles.bubble}>
                    <span className={styles.typing} />
                  </div>
                </div>
              )}
            </div>

            <div className={styles.controls}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about this site (press Ctrl+Enter to send)"
                className={styles.input}
                aria-label="Ask the site assistant"
              />
              <button onClick={send} className={styles.send} disabled={loading || !input.trim()} aria-label="Send message">
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
