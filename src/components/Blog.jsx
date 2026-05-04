// src/components/Blog.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useScrollAnimation } from '../hooks/index.js'
import { fetchBlogs } from '../services/api'
import { blogs as staticBlogs } from '../data/testimonials'
import styles from './Blog.module.css'

export default function Blog() {
  const { ref, inView } = useScrollAnimation()
  const [blogs, setBlogs] = useState(staticBlogs)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        if (data?.content?.length) setBlogs(data.content)
      })
      .catch(() => {
        // silently fall back to static data
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="blog" className="container">
      <div className="section-tag">WRITING</div>
      <h2 className="section-title">Blog Articles</h2>

      <motion.div
        ref={ref}
        className={styles.grid}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {blogs.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>
    </section>
  )
}

function BlogCard({ post }) {
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div className={styles.card} variants={cardVariant}>
      <Link to={`/blog/${post.id}`} className={styles.cardLink}>
        <div className={styles.meta}>
          <span className={styles.date}>{post.date}</span>
          {post.readTime && <span className={styles.readTime}>{post.readTime}</span>}
        </div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.readMore}>
          Read article <FiArrowRight size={12} />
        </span>
      </Link>
    </motion.div>
  )
}
