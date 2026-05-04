# Harshit Gupta — Portfolio Website

React frontend for the portfolio. Backend: Spring Boot (separate repo). Deployed on AWS S3 + CloudFront.

## Tech Stack
- **React 18** + Vite
- **React Router v6** — client-side routing
- **Framer Motion** — scroll animations
- **React Icons** — icon set
- **React Helmet Async** — SEO meta tags
- **CSS Modules** — scoped styling
- **Axios** — API calls to Spring Boot backend

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Navbar + Outlet + Footer wrapper
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css
│   ├── Hero.jsx / .css
│   ├── Experience.jsx / .css
│   ├── Projects.jsx / .css
│   ├── Skills.jsx / .css
│   ├── Blog.jsx / .css
│   ├── Testimonials.jsx / .css
│   ├── ResumeBanner.jsx / .css
│   └── Contact.jsx / .css
├── pages/
│   ├── Home.jsx            # Assembles all sections
│   └── BlogPost.jsx        # Individual blog post page
├── data/
│   ├── experience.js       # ← EDIT YOUR WORK HISTORY HERE
│   ├── projects.js         # ← EDIT YOUR PROJECTS HERE
│   ├── skills.js           # ← EDIT YOUR SKILLS HERE
│   └── testimonials.js     # ← EDIT TESTIMONIALS & BLOG HERE
├── hooks/
│   └── index.js            # useScrollAnimation, useContact
├── services/
│   └── api.js              # Axios instance + API calls
├── App.jsx                 # Router setup
├── main.jsx                # React entry point
└── index.css               # Global styles + CSS variables
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure env
cp .env.example .env.local
# Leave VITE_API_URL empty for dev (Vite proxies /api → localhost:8080)

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

## Connecting to Spring Boot Backend

The Vite dev server proxies `/api/*` → `http://localhost:8080` (see `vite.config.js`).

Start your Spring Boot app on port 8080 and the contact form, blog, and resume download will work automatically.

For production, set `VITE_API_URL=https://your-api-domain.com` in your environment.

## Customise Your Content

All personal data lives in `src/data/` — just edit those JS files:

| File | What to update |
|------|----------------|
| `experience.js` | Companies, roles, periods, descriptions |
| `projects.js` | Project titles, links, descriptions, tags |
| `skills.js` | Skill groups and proficiency levels |
| `testimonials.js` | Testimonial quotes + blog post metadata |

## Build & Deploy to AWS S3

```bash
# Build
npm run build
# Output: dist/

# Deploy to S3
aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Adding Your Photo

In `Hero.module.css`, replace the `.avatar` placeholder with:

```css
.avatar {
  background-image: url('/your-photo.jpg');
  background-size: cover;
  background-position: center;
}
```

Place `your-photo.jpg` in the `public/` folder.
