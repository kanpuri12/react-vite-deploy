import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { downloadResume } from '../services/api'
import styles from './Hero.module.css'
import avatar from '../assets/avatar.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
}

const TYPED_ROLES = [
  'Technical Lead',
  'Full Stack Developer',
  'Java Architect',
  'Gen AI Builder',
  'React Specialist',
]

function TypedRole() {
  const elRef = useRef(null)

  useEffect(() => {
    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    let timer

    function tick() {
      const role = TYPED_ROLES[roleIndex]
      if (deleting) {
        charIndex--
      } else {
        charIndex++
      }
      if (elRef.current) elRef.current.textContent = role.slice(0, charIndex)

      let delay = deleting ? 45 : 90
      if (!deleting && charIndex === role.length) {
        delay = 1800
        deleting = true
      } else if (deleting && charIndex === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % TYPED_ROLES.length
        delay = 300
      }
      timer = setTimeout(tick, delay)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return (
    <span className={styles.typed} ref={elRef} aria-live="polite" />
  )
}

export default function Hero() {
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })

  // Parallax orbs
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <section className={styles.hero}>
      {/* Animated background orbs */}
      <div className={styles.orbs}>
        <motion.div className={`${styles.orb} ${styles.orb1}`} style={{ x: springX, y: springY }} />
        <motion.div className={`${styles.orb} ${styles.orb2}`} style={{ x: springX, y: springY }} />
        <motion.div className={`${styles.orb} ${styles.orb3}`} />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.particle}
          style={{
            left: `${10 + (i * 7.5) % 80}%`,
            top: `${15 + (i * 13) % 70}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
        >
          <span className={styles.dot} />
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        <motion.h1 className={styles.heading} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <span className={styles.name}>Harshit Gupta</span>
          <span className={styles.roleRow}>
            <TypedRole />
            <span className={styles.cursor}>|</span>
          </span>
        </motion.h1>

        <motion.p className={styles.sub} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          8+ years building enterprise-grade full-stack systems. Java Spring Boot backends,
          React micro frontends, cloud-native on AWS — now leveling up with Gen AI and Agentic Workflows.
          Based in Greater Noida, India.
        </motion.p>

        <motion.div className={styles.btns} variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <button className="btn-primary" onClick={scrollToProjects}>View Work →</button>
          <button className="btn-secondary" onClick={scrollToContact}>Let's Connect</button>
          <button className="btn-secondary" onClick={downloadResume}>Resume ↓</button>
        </motion.div>

        <motion.div className={styles.stats} variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          {[
            { num: '8+', label: 'Years Experience' },
            { num: '5', label: 'Companies' },
            { num: '15+', label: 'Technologies' },
            { num: 'Gen AI', label: 'LangChain · RAG' },
          ].map(({ num, label }) => (
            <motion.div
              key={label}
              className={styles.stat}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className={styles.avatarWrap}
        initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className={styles.avatarRing}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <div className={styles.avatar}>
          <img src={avatar} alt="Harshit Gupta" className={styles.avatarImg} />
        </div>
        <div className={styles.avatarGlow} />

        {/* Tech badges orbiting */}
        {['React', 'Java', 'AWS', 'AI'].map((tech, i) => (
          <motion.div
            key={tech}
            className={styles.techBadge}
            style={{
              '--angle': `${i * 90}deg`,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
          >
            <motion.span
              animate={{ rotate: [-360, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
            >
              {tech}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
