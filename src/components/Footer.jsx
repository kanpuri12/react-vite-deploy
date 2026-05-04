// src/components/Footer.jsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>HK.dev</span>
      <span className={styles.copy}>
        © {new Date().getFullYear()} Harshit Kumar — Built with React + Spring Boot + AWS
      </span>
      <div className={styles.socials}>
        <a href="https://github.com/harshit-kumar" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/harshit-kumar" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  )
}
