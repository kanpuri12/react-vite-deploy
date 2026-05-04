import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/index.js'
import { experience } from '../data/experience'
import styles from './Experience.module.css'

export default function Experience() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="experience" className="container">
      <div className="section-tag">CAREER HISTORY</div>
      <h2 className="section-title">Work Experience</h2>

      <motion.div
        ref={ref}
        className={styles.timeline}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {experience.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  )
}

function TimelineItem({ item }) {
  const itemVariant = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <motion.div
      className={styles.item}
      variants={itemVariant}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
    >
      <div className={`${styles.dot} ${item.current ? styles.dotCurrent : ''}`}>
        {item.current && (
          <motion.div
            className={styles.dotPulse}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.company}>{item.company}</span>
          {item.client && <span className={styles.client}>↳ {item.client}</span>}
          <span className={styles.period}>{item.period}</span>
          {item.current && <span className={styles.badge}>Current</span>}
        </div>

        <div className={styles.role}>{item.role}</div>
        <p className={styles.desc}>{item.description}</p>

        <div className={styles.tags}>
          {item.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
