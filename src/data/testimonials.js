// src/data/testimonials.js

export const testimonials = [
  {
    id: 1,
    text: "Harshit's ability to design clean microservices and write well-tested Java code is exceptional. He took ownership of critical backend modules and consistently delivered on time.",
    name: 'Rahul Sharma',
    role: 'Tech Lead',
    company: 'Walmart',
    initials: 'RS',
  },
  {
    id: 2,
    text: "Working with Harshit was a pleasure. His Spring Boot expertise and understanding of distributed systems helped us scale our platform to handle 10x traffic.",
    name: 'Anjali Patel',
    role: 'Engineering Manager',
    company: 'Ericsson',
    initials: 'AP',
  },
  {
    id: 3,
    text: "Harshit brings both technical depth and collaborative energy. His React dashboards were polished, performant, and the team loved working with him.",
    name: 'Vikram Kumar',
    role: 'Product Manager',
    company: 'Hcl',
    initials: 'VK',
  },
]

// src/data/blogs.js — static fallback (real data comes from Spring Boot API)
export const blogs = [
  {
    id: 1,
    date: 'Jan 2025',
    title: 'JVM Memory Management: Heap, Stack & Metaspace Explained',
    excerpt:
      'A deep dive into how JVM allocates memory, common OOM errors and how to debug them in production.',
    readTime: '8 min read',
    slug: 'jvm-memory-management',
  },
  {
    id: 2,
    date: 'Nov 2024',
    title: 'Thread Safety in Java: synchronized vs ReentrantLock',
    excerpt:
      'Practical guide to writing thread-safe Java code with real-world BankAccount examples and benchmarks.',
    readTime: '6 min read',
    slug: 'thread-safety-java',
  },
  {
    id: 3,
    date: 'Sep 2024',
    title: 'Deploying Spring Boot on AWS: EC2 to ECS Fargate',
    excerpt:
      'Step-by-step walkthrough for containerizing and deploying a Spring Boot API on AWS with auto-scaling.',
    readTime: '10 min read',
    slug: 'spring-boot-aws-deployment',
  },
]
