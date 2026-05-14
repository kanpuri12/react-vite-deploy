import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import Chat from './Chat'

export default function Layout() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--accent)',
          transformOrigin: '0%',
          zIndex: 9999,
        }}
      />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chat />
    </>
  )
}
