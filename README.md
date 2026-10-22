# Gizmo — Engineering Project Showcase

A modern, responsive, nature-and-magic inspired engineering portfolio and project showcase for **Senithu Sethmin Warnakulasooriya**, Electrical and Electronic Engineering Undergraduate, guided by **Gizmo, the Workshop Wizard**.

---

## 🎨 Visual Design System

Inspired by the provided reference layout and character sheets:
- **Main Background**: Warm Cream `#F5EDE2` (Dark Mode: `#0E1F1C`)
- **Primary Green**: Deep Forest Green `#184E46`
- **Leaf Green**: Sage / Leaf `#A7D7B7`
- **Forest Brown**: Explorer Cloak `#6B4E3F`
- **Golden Accent**: Gear & Sparkles `#F6C85F`
- **Magic Teal**: Glowing Staff Crystal `#4DD0B6`
- **Typography**: Rounded, highly legible font (**Nunito**) paired with monospace accents (**JetBrains Mono**)
- **Aesthetic**: Minimalist engineering workbench with subtle organic leaves, circuits, and magical workshop motifs

---

## 🧙 Mascot vs. Portfolio Owner

- **Portfolio Owner**: **Senithu Sethmin Warnakulasooriya** (Electrical & Electronic Engineering Undergraduate)
- **Mascot & Guide**: **Gizmo, the Workshop Wizard** — a cheerful male mushroom wizard with large green eyes, cream mushroom cap with green spots, brown explorer cloak, golden gear buckle, and a wooden mechanical staff crowned by a pulsing magic teal crystal. Gizmo introduces Senithu's work, shares engineering trivia, and helps visitors navigate the workbench.

---

## 📂 Key Architecture & Routes

| Route | View | Description |
|---|---|---|
| `/` | `HomePage` | Hero, What I Do, Featured Projects, Skills & Tools Artifacts, Latest Blogs, Timeline, About |
| `/projects` | `ProjectsPage` | Searchable & filterable engineering project database |
| `/projects/:slug` | `ProjectDetailPage` | 19-section deep technical breakdown with BOM, architecture, schematics, code snippets, lightbox gallery & comments |
| `/blogs` | `BlogsPage` | Technical lab notes with category filtering |
| `/blogs/:slug` | `BlogDetailPage` | Markdown-style write-ups with Table of Contents, code syntax blocks, and social share |
| `/timeline` | `TimelinePage` | Chronological academic milestones, prototype completions, and field deployments |
| `/about` | `AboutPage` | Creator biography, coursework focus, and collaboration contact channel |
| `/404` | `NotFoundPage` | Gizmo in surprised mode assisting visitors back to the workshop |

---

## 🛠️ How to Replace Sample Content with Real Data

All portfolio data is separated into clean, typed TypeScript modules:

1. **Owner Details & Social Links**: `src/config/site.ts`
   - Edit `ownerName`, `ownerRole`, `ownerBio`, `contactEmail`, `githubUrl`, `linkedinUrl`, `resumePath`, and `interests`.
2. **Projects**: `src/data/projects.ts`
   - Add your real circuit schematics, PCB renders, component bills of materials, and GitHub links.
3. **Skills Artifacts**: `src/data/skills.ts`
   - Customize your engineering tools, CAD software, and hardware specialties.
4. **Blog Posts**: `src/data/blogs.ts`
   - Add new engineering articles with custom code snippets and callouts without needing a database CMS.
5. **Timeline**: `src/data/timeline.ts`
   - Record your graduation milestones, competitions, and deployed hardware.

---

## 🖼️ How to Supply Isolated Gizmo Image Assets

The application includes an SVG fallback avatar for Gizmo that matches the exact colors and features. To use isolated PNGs exported from the provided brand sheet:

1. Crop the character expressions with a transparent background.
2. Save them into `public/assets/gizmo/`:
   - `gizmo-happy.png` (Welcome / Happy)
   - `gizmo-curious.png` (Exploring / Search)
   - `gizmo-thinking.png` (Help mode / Q&A)
   - `gizmo-excited.png` (Celebration / Milestones)
   - `gizmo-surprised.png` (Discovery / 404)
   - `gizmo-sleepy.png` (Idle)
3. See `public/assets/gizmo/README.md` for resolution recommendations.

---

## 🔥 Firebase Authentication & Firestore Setup

The portfolio functions immediately in simulated guest/demo mode if Firebase keys are absent. To connect live cloud persistence:

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** > **Google Sign-In**.
3. Enable **Cloud Firestore** in production mode.
4. Add your Web App configuration keys to `.env`:
   ```bash
   VITE_FIREBASE_API_KEY="AIzaSy..."
   VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your-app"
   VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
   VITE_FIREBASE_APP_ID="1:123456789012:web:..."
   ```
5. Deploy `firestore.rules` and `firestore.indexes.json` using the Firebase CLI:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```
6. **Safety Moderation**:
   - Comments and ideas submitted by signed-in visitors automatically start with `status: 'pending'`.
   - Public queries retrieve only `status == 'approved'`, preventing spam or unmoderated content from appearing publicly.
   - Authors can immediately see their own pending submissions with a status badge.

---

## 🚀 GitHub Pages Deployment

This project uses `HashRouter` for zero-configuration deep links on GitHub Pages.

1. Push your repository to GitHub.
2. In GitHub repository **Settings** > **Pages**:
   - Source: **GitHub Actions**
3. The workflow file at `.github/workflows/deploy.yml` automatically triggers on push to `main`:
   - Installs dependencies (`npm ci`)
   - Validates TypeScript (`tsc --noEmit`)
   - Builds production bundle (`npm run build`)
   - Deploys `dist/` directly to your GitHub Pages URL: `https://USERNAME.github.io/REPOSITORY/`

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript checks
npx tsc --noEmit

# Build production bundle
npm run build
```
