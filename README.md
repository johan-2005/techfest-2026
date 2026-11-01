# TechFest 2026 Portal — Module 5 (Security, DevOps & Deployment)

## Project Structure

```
techfest-module5/
├── .github/workflows/ci.yml    ← GitHub Actions CI pipeline
├── .gitignore
├── server/
│   ├── app.js                  ← Express app with Helmet, mongoSanitize
│   ├── index.js                ← Server entry (calls .listen)
│   ├── package.json
│   ├── .env.example
│   ├── middleware/auth.js      ← JWT auth with secure cookie support
│   ├── models/                 ← Mongoose schemas
│   ├── routes/
│   │   ├── auth.js             ← Login/Register with validation
│   │   ├── events.js
│   │   └── feedback.js         ← XSS-safe with input escaping
│   └── __tests__/health.test.js ← Jest + Supertest tests for CI
├── client/
│   ├── public/
│   │   ├── index.html          ← SEO meta tags for Lighthouse
│   │   └── _redirects          ← Netlify SPA redirect rule
│   ├── src/
│   │   ├── App.jsx             ← Lazy-loaded routes (code splitting)
│   │   ├── components/Navbar.jsx
│   │   └── pages/              ← All page components
│   └── .env.example
└── README.md
```

---

## Step-by-Step: Git Setup & Push to GitHub

### 1. Initial setup
```bash
cd techfest-module5
git init
git add .
git commit -m "Initial commit: TechFest 2026 Portal with security fixes"
```

### 2. Branching and merging
```bash
# Create a feature branch
git checkout -b feature-page

# Make a small change (edit any file), then:
git add .
git commit -m "Add feature page component"

# Merge back to main
git checkout main
git merge feature-page
```

### 3. Create a merge conflict (for demo)
```bash
# On main — edit line 1 of client/src/pages/Home.jsx
# Change the function name or the h1 text
git add . && git commit -m "Edit Home title on main"

# Create conflict branch
git checkout -b conflict-branch

# Edit the SAME line differently
git add . && git commit -m "Edit Home title on conflict-branch"

# Merge — this will show CONFLICT
git checkout main
git merge conflict-branch

# Open the file, keep the right version, remove <<<< ==== >>>> markers
git add .
git commit -m "Resolve merge conflict in Home.jsx"
```

### 4. Push to GitHub
```bash
# Create a new EMPTY repo on github.com (no README, no .gitignore)
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/techfest-2026.git
git branch -M main
git push -u origin main
```

After this, every future push:
```bash
git add .
git commit -m "your message"
git push
```

### 5. CI Pipeline — red then green demo
The `.github/workflows/ci.yml` is already included.

To show a RED (failing) run:
1. Temporarily break a test (e.g., change `expect(res.statusCode).toBe(200)` to `.toBe(999)`)
2. Push → GitHub Actions tab will show ❌
3. Screenshot it

To show GREEN:
1. Fix the test back
2. Push → Actions tab shows ✅
3. Screenshot it

---

## Deployment

### Database — MongoDB Atlas
1. Go to https://cloud.mongodb.com → Create free cluster
2. Database Access → Add user with password
3. Network Access → Allow `0.0.0.0/0`
4. Connect → Copy connection string
5. Replace `<password>` with your actual password

### Backend — Render
1. Go to https://render.com → New Web Service
2. Connect your GitHub repo, select the `server` folder
3. Build command: `npm install`
4. Start command: `node index.js`
5. Add environment variables:
   - `MONGO_URI` = your Atlas connection string
   - `JWT_SECRET` = any long random string
   - `CLIENT_URL` = your Netlify URL (after frontend deploy)
   - `NODE_ENV` = production
6. Deploy → note the URL (e.g., https://techfest-api.onrender.com)

### Frontend — Netlify
1. Go to https://netlify.com → Import from GitHub
2. Select your repo, set base directory to `client`
3. Build command: `npm run build`
4. Publish directory: `build` (CRA) or `dist` (Vite)
5. Add environment variable:
   - `REACT_APP_API_URL` = your Render URL
6. Deploy → note the URL
7. The `_redirects` file is already included for React Router

---

## Lighthouse Optimization Checklist

### What's already optimized in this code:
- [x] Lazy loading routes (code splitting) — App.jsx
- [x] Lazy loading images — `loading="lazy"` in Gallery.jsx
- [x] Explicit image dimensions — `width` and `height` attributes
- [x] Alt text on all images
- [x] Meta description tag
- [x] Meta viewport tag
- [x] Theme color
- [x] Accessible form labels (`aria-label`)
- [x] Semantic HTML (`nav`, `h1`–`h3`)
- [x] HTTPS (automatic on Netlify/Render)

### Additional fixes to improve your score:
- [ ] Compress images with https://tinypng.com or convert to WebP
- [ ] Add `rel="noopener"` to any external links
- [ ] Ensure color contrast meets WCAG AA
- [ ] Run `npm run build` to get minified production bundle

### How to run the Lighthouse audit:
1. Open your deployed site in Chrome
2. Press F12 → Lighthouse tab
3. Check: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"
5. Screenshot the scores → this is your "BEFORE"
6. Apply remaining fixes, redeploy
7. Run Lighthouse again → screenshot → this is your "AFTER"

---

## Security Fixes Summary (for report)

| Vulnerability        | Before                          | After (Fix)                              |
|----------------------|---------------------------------|------------------------------------------|
| NoSQL Injection      | Raw `req.body` in queries       | `express-mongo-sanitize` + `express-validator` |
| XSS                  | Could inject `<script>` tags    | React auto-escaping + `helmet()` CSP     |
| Cookie Theft         | Token in localStorage           | `httpOnly`, `secure`, `sameSite` cookie  |
| CSRF                 | No protection                   | `sameSite: "Strict"` cookie              |
| Missing Headers      | No security headers             | `helmet()` adds CSP, X-Frame, etc.       |

Feature: about section added
