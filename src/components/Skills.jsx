import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/index.js'
import { setSkillFilter } from '../store/uiSlice'
import { skills } from '../data/skills'
import styles from './Skills.module.css'

const ALL_GROUPS = ['All', ...skills.map(s => s.group)]

export default function Skills() {
  const { ref, inView } = useScrollAnimation()
  const dispatch = useDispatch()
  const filter = useSelector(s => s.ui.skillFilter)

  const filtered = filter === 'All' ? skills : skills.filter(s => s.group === filter)

  return (
    <section id="skills" className="container">
      <div className="section-tag">EXPERTISE</div>
      <h2 className="section-title">Skills &amp; Technologies</h2>

      <div className={styles.filters}>
        {ALL_GROUPS.map(g => (
          <motion.button
            key={g}
            className={`${styles.filterBtn} ${filter === g ? styles.filterActive : ''}`}
            onClick={() => dispatch(setSkillFilter(g))}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {g}
          </motion.button>
        ))}
      </div>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((group) => (
            <SkillGroup key={group.group} group={group} inView={inView} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

const SkillGroup = React.forwardRef(function SkillGroup({ group, inView }, ref) {
  const groupVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } },
  }

  return (
    <motion.div ref={ref} className={styles.group} variants={groupVariant} layout>
      <div className={styles.groupName}>{group.group.toUpperCase()}</div>
      <div className={styles.items}>
        {group.items.map((item, i) => (
          <div className={styles.item} key={item.name}>
            <div className={styles.itemTop}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPct}>{item.level}%</span>
            </div>
            <div className={styles.barTrack}>
              <motion.div
                className={styles.barFill}
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.level}%` } : { width: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
})

export { SkillGroup }
