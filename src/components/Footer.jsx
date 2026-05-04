// src/components/Footer.jsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>HK.dev</span>
      <span className={styles.copy}>
        © {new Date().getFullYear()} Harshit Gupta — Built with React + Spring Boot + AWS
      </span>
      <div className={styles.socials}>
        <a href="https://github.com/kanpuri12" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/harshit-gupta-459715104/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  )
}
