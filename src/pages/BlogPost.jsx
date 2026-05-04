// src/pages/BlogPost.jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiArrowLeft } from 'react-icons/fi'
import { fetchBlogById } from '../services/api'
import { blogs as staticBlogs } from '../data/testimonials'
import styles from './BlogPost.module.css'

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogById(id)
      .then(setPost)
      .catch(() => {
        // fallback to static
        const found = staticBlogs.find((b) => String(b.id) === String(id))
        setPost(found || null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!post) {
    return (
      <div className={styles.notFound}>
        <p>Post not found.</p>
        <Link to="/" className={styles.back}><FiArrowLeft /> Back home</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Harshit Kumar</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className={styles.article}>
        <Link to="/#blog" className={styles.back}>
          <FiArrowLeft size={14} /> Back to blog
        </Link>

        <div className={styles.meta}>
          <span className={styles.date}>{post.date}</span>
          {post.readTime && <span className={styles.readTime}>{post.readTime}</span>}
        </div>

        <h1 className={styles.title}>{post.title}</h1>

        {post.content ? (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className={styles.excerpt}>{post.excerpt}</p>
        )}
      </article>
    </>
  )
}
