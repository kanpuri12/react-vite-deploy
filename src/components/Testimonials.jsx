// src/components/Testimonials.jsx
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/index.js'
import { testimonials } from '../data/testimonials'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="container">
      <div className="section-tag">SOCIAL PROOF</div>
      <h2 className="section-title">Testimonials</h2>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} item={t} />
        ))}
      </motion.div>
    </section>
  )
}

function TestimonialCard({ item }) {
  const variant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  }

  return (
    <motion.div className={styles.card} variants={variant}>
      <div className={styles.quote}>"</div>
      <p className={styles.text}>{item.text}</p>
      <div className={styles.person}>
        <div className={styles.avatar}>{item.initials}</div>
        <div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.role}>{item.role}, {item.company}</div>
        </div>
      </div>
    </motion.div>
  )
}
