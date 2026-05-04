// src/components/ResumeBanner.jsx
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/index.js'
import { downloadResume } from '../services/api'
import styles from './ResumeBanner.module.css'

export default function ResumeBanner() {
  const { ref, inView } = useScrollAnimation()

  return (
    <div className={styles.outer}>
      <motion.div
        ref={ref}
        className={styles.banner}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
      >
        <div>
          <p className={styles.heading}>Looking for my full experience &amp; education details?</p>
          <p className={styles.sub}>Download my résumé — updated {new Date().getFullYear()}</p>
        </div>
        <button className={styles.btn} onClick={downloadResume}>
          Download Resume PDF ↓
        </button>
      </motion.div>
    </div>
  )
}
