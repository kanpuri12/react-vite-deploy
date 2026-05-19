import React from 'react'
import { Link } from 'react-router-dom'

export default function SystemDesign() {
  return (
    <section className="container">
      <h1>System Design & Architecture</h1>
      <p>End-to-end system design for enterprise-grade applications — from bounded contexts to data modelling and reliability patterns.</p>
      <h3>What I deliver</h3>
      <ul>
        <li>Architecture review & diagrams</li>
        <li>Scalability and failure-mode analysis</li>
        <li>Data modelling and storage strategy (SQL/NoSQL)</li>
      </ul>
      <p>Interested? <Link to="/contact">Let's talk</Link>.</p>
    </section>
  )
}
