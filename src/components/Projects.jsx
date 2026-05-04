import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useScrollAnimation } from '../hooks/index.js'
import { setProjectFilter } from '../store/uiSlice'
import { projects } from '../data/projects'
import styles from './Projects.module.css'

const ALL_CATS = ['All', ...new Set(projects.map(p => p.category))]

export default function Projects() {
  const { ref, inView } = useScrollAnimation()
  const dispatch = useDispatch()
  const filter = useSelector(s => s.ui.projectFilter)

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="container">
      <div className="section-tag">PORTFOLIO</div>
      <h2 className="section-title">Featured Projects</h2>

      {/* Filter pills */}
      <div className={styles.filters}>
        {ALL_CATS.map(cat => (
          <motion.button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
            onClick={() => dispatch(setProjectFilter(cat))}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {cat}
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
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

import React from 'react'

const ProjectCard = React.forwardRef(function ProjectCard({ project }, ref) {
  const cardVariant = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      variants={cardVariant}
      layout
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.cardTop}>
        <span className={styles.num}>{project.num} / {project.category}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <div className={styles.links}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className={styles.link} aria-label="GitHub">
              <FiGithub size={15} /> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className={styles.link} aria-label="Live demo">
              <FiExternalLink size={15} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
})

export { ProjectCard }
