import React from 'react'
import { Link } from 'react-router-dom'

export default function WebDevelopment() {
  return (
    <section className="container">
      <h1>Web Application Development</h1>
      <p>I build modern, scalable web applications using React, micro-frontends, and cloud-native architectures. I focus on maintainability, performance, and delivering measurable business outcomes.</p>
      <h3>What I deliver</h3>
      <ul>
        <li>Production-ready React apps with component-driven architecture</li>
        <li>Backend microservices (Java, Spring Boot) and APIs</li>
        <li>CI/CD, testing, and deployment to AWS</li>
      </ul>
      <p>Interested? <Link to="/contact">Let's talk</Link>.</p>
    </section>
  )
}
