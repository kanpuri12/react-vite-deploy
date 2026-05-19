import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileDevelopment() {
  return (
    <section className="container">
      <h1>Mobile App Development</h1>
      <p>I deliver cross-platform mobile apps using Flutter and React Native. I focus on native-like performance, clean architecture, and fast delivery.</p>
      <h3>What I deliver</h3>
      <ul>
        <li>Flutter apps with platform-specific integrations</li>
        <li>React Native apps with proper native module wiring</li>
        <li>End-to-end release support (Play Store, App Store)</li>
      </ul>
      <p>Interested? <Link to="/contact">Let's talk</Link>.</p>
    </section>
  )
}
