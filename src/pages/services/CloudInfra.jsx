import React from 'react'
import { Link } from 'react-router-dom'

export default function CloudInfra() {
  return (
    <section className="container">
      <h1>Cloud & Infrastructure</h1>
      <p>Architecting scalable cloud infrastructure on AWS — IaC, cost optimization, security baselines, and observability.</p>
      <h3>What I deliver</h3>
      <ul>
        <li>Terraform / CloudFormation skeletons</li>
        <li>Cost & performance optimization</li>
        <li>Automated CI/CD pipelines and blue/green deployments</li>
      </ul>
      <p>Interested? <Link to="/contact">Let's talk</Link>.</p>
    </section>
  )
}
