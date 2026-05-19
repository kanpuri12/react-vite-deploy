import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { setMenuOpen, toggleMenu, setActiveSection } from '../store/uiSlice'
import { useTheme } from '../hooks/index.js'
import { downloadResume } from '../services/api'
import { FiSun, FiMoon } from 'react-icons/fi'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Blog',       href: '#blog' },
  { label: 'Contact',    href: '#contact' },
]

const SERVICES = [
  {
    label: 'Web Development',
    href: '/services/web',
    children: [
      { label: 'React / SPA', href: '/services/web#react' },
      { label: 'Full-stack (React + Java)', href: '/services/web#fullstack' },
      { label: 'Micro-frontends', href: '/services/web#microfrontends' },
    ],
  },
  {
    label: 'Mobile Development',
    href: '/services/mobile',
    children: [
      { label: 'Flutter', href: '/services/mobile#flutter' },
      { label: 'React Native', href: '/services/mobile#react-native' },
    ],
  },
  {
    label: 'Cloud Infrastructure',
    href: '/services/cloud',
    children: [
      { label: 'AWS Architecture', href: '/services/cloud#aws' },
      { label: 'CI/CD & IaC', href: '/services/cloud#cicd' },
    ],
  },
  {
    label: 'System Design',
    href: '/services/system-design',
    children: [
      { label: 'Architecture Review', href: '/services/system-design#review' },
      { label: 'Scalability & Performance', href: '/services/system-design#scaling' },
    ],
  },
  {
    label: 'Generative AI PoC',
    href: '/services/genai',
    children: [
      { label: 'RAG / Retrieval', href: '/services/genai#rag' },
      { label: 'Agents & Workflows', href: '/services/genai#agents' },
    ],
  },
]

export default function Navbar() {
  const dispatch = useDispatch()
  const { menuOpen, activeSection } = useSelector(s => s.ui)
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const [servicesOpen, setServicesOpen] = useState(false)
  const hoverTimeout = useRef(null)
  const servicesMenuRef = useRef(null)

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

  useEffect(() => {
    return () => {
      // cleanup hover timeout
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    }
  }, [])

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

        <li className={styles.navItem}>
          <div
            className={styles.servicesMenu}
            ref={servicesMenuRef}
            onMouseEnter={() => {
              if (hoverTimeout.current) { clearTimeout(hoverTimeout.current); hoverTimeout.current = null }
              setServicesOpen(true)
            }}
            onMouseLeave={() => {
              hoverTimeout.current = setTimeout(() => setServicesOpen(false), 120)
            }}
          >
            <button className={styles.servicesButton} onClick={() => setServicesOpen(s => !s)} aria-expanded={servicesOpen}>Services ▾</button>
            <div className={`${styles.servicesDropdown} ${servicesOpen ? styles.open : ''}`}>
              {SERVICES.map(s => (
                <div key={s.label} className={styles.servicesGroup}>
                  <Link to={s.href} className={styles.servicesLink} onClick={() => dispatch(setMenuOpen(false))}>{s.label}</Link>
                  <div className={styles.servicesChildren}>
                    {s.children.map(c => (
                      <Link key={c.label} to={c.href} className={styles.servicesChild} onClick={() => dispatch(setMenuOpen(false))}>{c.label}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </li>
      </ul>

      <button className={styles.cta} onClick={downloadResume}>
        Resume ↓
      </button>

      <button className={styles.themeToggle} onClick={toggle} aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              <Link to="/services/web" className={styles.drawerLink} onClick={() => dispatch(setMenuOpen(false))}>Web Development</Link>
              <Link to="/services/mobile" className={styles.drawerLink} onClick={() => dispatch(setMenuOpen(false))}>Mobile Development</Link>
              <Link to="/services/cloud" className={styles.drawerLink} onClick={() => dispatch(setMenuOpen(false))}>Cloud Infrastructure</Link>
              <Link to="/services/system-design" className={styles.drawerLink} onClick={() => dispatch(setMenuOpen(false))}>System Design</Link>
              <Link to="/services/genai" className={styles.drawerLink} onClick={() => dispatch(setMenuOpen(false))}>Generative AI PoC</Link>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className={styles.cta} onClick={downloadResume}>Resume ↓</button>
              <button className={styles.themeToggle} onClick={toggle} aria-label="Toggle theme">
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
