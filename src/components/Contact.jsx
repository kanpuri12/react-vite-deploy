import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin } from 'react-icons/fi'
import { useScrollAnimation } from '../hooks/index.js'
import { submitContact, resetContact } from '../store/contactSlice'
import styles from './Contact.module.css'

const CONTACT_LINKS = [
  { icon: FiMail,     label: 'harshit123907@gmail.com',          href: 'mailto:harshit123907@gmail.com' },
  { icon: FiPhone,    label: '+91 7905385520',                   href: 'tel:+917905385520' },
  { icon: FiLinkedin, label: 'linkedin.com/in/harshit-gupta-459715104', href: 'https://www.linkedin.com/in/harshit-gupta-459715104/' },
  { icon: FiGithub,   label: 'https://github.com/kanpuri12',   href: 'https://github.com/kanpuri12' },
  { icon: FiMapPin,   label: 'Greater Noida, UP, India', href: null },
]

const INITIAL_FORM = { name: '', email: '', message: '' }

export default function Contact() {
  const { ref, inView } = useScrollAnimation()
  const dispatch = useDispatch()
  const { status, error } = useSelector(s => s.contact)
  const [form, setForm] = useState(INITIAL_FORM)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitContact(form))
    setForm(INITIAL_FORM)
  }

  return (
    <section id="contact" className="container">
      <div className="section-tag">GET IN TOUCH</div>
      <h2 className="section-title">Let's Work Together</h2>

      <motion.div
        ref={ref}
        className={styles.wrap}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.info}>
          <p className={styles.infoText}>
            Technical Lead with 8+ years of full-stack expertise. Open to senior roles,
            leadership positions, and GenAI-driven product opportunities — remote or NCR/Noida.
          </p>
          <div className={styles.links}>
            {CONTACT_LINKS.map(({ icon: Icon, label, href }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.contactLink}>
                  <Icon size={14} /> {label}
                </a>
              ) : (
                <div key={label} className={styles.contactLink}>
                  <Icon size={14} /> {label}
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.formWrap}>
          {status === 'success' ? (
            <motion.div
              className={styles.successBox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className={styles.successIcon}>✓</span>
              <p>Message sent! I'll get back to you soon.</p>
              <button className="btn-secondary" onClick={() => dispatch(resetContact())}>Send another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {['name', 'email'].map(field => (
                <div className={styles.field} key={field}>
                  <label className={styles.label} htmlFor={field}>
                    {field === 'name' ? 'Your name' : 'Email address'}
                  </label>
                  <input
                    id={field} name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    className={styles.input}
                    placeholder={field === 'name' ? 'Rahul Sharma' : 'rahul@company.com'}
                    value={form[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className={styles.field}>
                <label className={styles.label} htmlFor="message">Message</label>
                <textarea
                  id="message" name="message"
                  className={styles.textarea}
                  placeholder="Hi Harshit, I'd love to discuss a Technical Lead role..."
                  value={form.message}
                  onChange={handleChange}
                  required rows={5}
                />
              </div>
              {error && <p className={styles.errorMsg}>{error}</p>}
              <motion.button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
