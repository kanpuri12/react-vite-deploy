import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { setMenuOpen, toggleMenu, setActiveSection } from '../store/uiSlice'
import { useTheme } from '../hooks/index.js'
import { downloadResume } from '../services/api'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  // { label: 'Blog',       href: '#blog' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const dispatch = useDispatch()
  const { menuOpen, activeSection } = useSelector(s => s.ui)
  const location = useLocation()
  const { theme, toggle } = useTheme()

  // Track scroll for scrolled style
  useEffect(() => {
    const onScroll = () => {
      // Also detect active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          dispatch(setActiveSection(id))
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dispatch])

  const handleAnchor = (href) => {
    dispatch(setMenuOpen(false))
    if (location.pathname !== '/') { window.location.href = '/' + href; return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to="/" className={styles.logo}>
        <span className={styles.logoAccent}>H</span>G.dev
      </Link>

      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace('#', '')
          const isActive = activeSection === id
          return (
            <li key={label} style={{ position: 'relative' }}>
              <button
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                onClick={() => handleAnchor(href)}
              >
                {label}
                {isActive && (
                  <motion.span
                    className={styles.activeDot}
                    layoutId="activeDot"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <button className={styles.cta} onClick={downloadResume}>
        Resume ↓
      </button>

      <button className={styles.themeToggle} onClick={toggle} aria-label="Toggle theme">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>

      <button
        className={styles.hamburger}
        onClick={() => dispatch(toggleMenu())}
        aria-label="Toggle menu"
      >
        <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} />
        <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
        <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.drawer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.button
                key={label}
                className={styles.drawerLink}
                onClick={() => handleAnchor(href)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {label}
              </motion.button>
            ))}
            <button className={styles.cta} onClick={downloadResume}>Resume ↓</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
