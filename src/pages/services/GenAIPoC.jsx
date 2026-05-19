import React from 'react'
import { Link } from 'react-router-dom'

export default function GenAIPoC() {
  return (
    <section className="container">
      <h1>GenAI / RAG Proof of Concept</h1>
      <p>I build focused GenAI proofs-of-concept using RAG and LangChain to rapidly validate product ideas and demo value.</p>
      <h3>What I deliver</h3>
      <ul>
        <li>Proof-of-concept with retrieval and prompt engineering</li>
        <li>Cost estimate for production</li>
        <li>Deployment notes and integration guide</li>
      </ul>
      <p>Interested? <Link to="/contact">Let's talk</Link>.</p>
    </section>
  )
}
