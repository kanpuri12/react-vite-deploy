// src/pages/Home.jsx
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Blog from '../components/Blog'
import Testimonials from '../components/Testimonials'
import ResumeBanner from '../components/ResumeBanner'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Harshit Gupta | Full Stack Developer — Noida</title>
        <meta name="description" content="Java & Full Stack Developer with 3+ years building scalable Spring Boot backends and React frontends. Based in Noida, India." />
        <meta property="og:title" content="Harshit Gupta | Full Stack Developer" />
        <meta property="og:description" content="Java & Full Stack Developer — Spring Boot · React · AWS" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <hr className="divider" />
      <Experience />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <Skills />
      {/* <hr className="divider" />
      <Blog /> */}
      <hr className="divider" />
      <Testimonials />
      <hr className="divider" />
      <ResumeBanner />
      <hr className="divider" />
      <Contact />
    </>
  )
}
