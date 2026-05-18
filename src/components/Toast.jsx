import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import styles from './Toast.module.css'

export default function Toast({ type = 'success', message = '', open = false, onClose = () => {} }) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`${styles.toast} ${styles[type]}`}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        >
          <div className={styles.content}>
            <div className={styles.msg}>{message}</div>
            <button className={styles.close} onClick={onClose} aria-label="Close notification"><FiX /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
