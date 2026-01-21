# Portfolio Customization Guide

## Quick Overview Component

The Quick Overview provides a professional one-page summary for recruiters. To customize it with your real data:

### Location
`src/components/overlays/QuickOverview.vue`

### What to Update

#### 1. Personal Information (Lines 11-21)

```vue
<h1 class="quick-overview__name">Adrian Tam</h1>
<p class="quick-overview__tagline">Senior Full-Stack Engineer • AI/ML Specialist</p>
<div class="quick-overview__location">
  <fa icon="location-dot" /> San Francisco Bay Area
</div>
```

**Update:** Your name, title, and location

---

#### 2. Skills (Lines 16-23)

```typescript
const skills: Skill[] = [
  { name: 'Python', level: 5, years: 5 },
  { name: 'TypeScript/JavaScript', level: 5, years: 4 },
  // Add your actual skills
]
```

**Fields:**
- `name`: Skill name
- `level`: Proficiency (1-5, where 5 is expert)
- `years`: Years of experience

---

#### 3. Experience (Lines 31-50)

```typescript
const experience: Experience[] = [
  {
    title: 'Senior Full-Stack Engineer',
    company: 'Current Company',
    period: '2022 - Present',
    highlights: [
      'Built AI-powered features processing 10M+ requests/day',
      // Use REAL metrics and achievements
    ],
    tech: ['Python', 'React', 'AWS', 'TensorFlow', 'PostgreSQL'],
  },
]
```

**Key Points:**
- Use **real company names** (not "Current Company")
- Include **actual metrics** (e.g., "Reduced latency by 60%", "10M+ requests/day")
- List specific technologies you used
- Focus on **impact**, not just responsibilities

---

#### 4. Projects (Lines 52-72)

```typescript
const projects = [
  {
    name: 'AI Content Generator',
    description: 'ML-powered content creation tool',
    impact: '100K+ generations, 95% user satisfaction',
    tech: ['Python', 'GPT-4', 'FastAPI', 'React'],
    link: '#', // TODO: Add real project link
  },
]
```

**Guidelines:**
- Use your **actual projects**
- Include **measurable impact** (users, performance, business metrics)
- Add real links to live demos or GitHub repos
- Choose 3-4 best projects that show range

---

#### 5. About Summary (Lines 96-102)

```vue
<p class="quick-overview__summary">
  Full-stack engineer with 5+ years building scalable systems...
</p>
```

**Write:**
- Your unique value proposition
- What makes you different
- Key achievements in 2-3 sentences
- Avoid generic statements

---

#### 6. Contact Links (Lines 189-199)

```vue
<a href="mailto:your.email@example.com" class="contact-link">
  <fa icon="envelope" /> Email
</a>
<a href="https://linkedin.com/in/yourprofile" target="_blank" class="contact-link">
  <fa :icon="['fab', 'linkedin']" /> LinkedIn
</a>
```

**Update:**
- Your real email
- LinkedIn profile URL
- GitHub profile URL
- Portfolio website (if applicable)

---

#### 7. Resume Download (Line 75)

```typescript
const handleDownloadResume = () => {
  window.open('#', '_blank') // TODO: Add actual resume PDF URL
}
```

**Action:**
- Upload your resume PDF to `/public` folder
- Update the link to `/resume.pdf`

---

## 3D Interactive Experience

### Overlay Content

Each overlay (Work, Education, Projects, etc.) can be customized in:

**Files:**
- `src/components/overlays/WorkOverlay.vue`
- `src/components/overlays/EducationOverlay.vue`
- `src/components/overlays/ProjectsOverlay.vue`
- `src/components/overlays/AwardsOverlay.vue`
- `src/components/overlays/AboutOverlay.vue`

### Data Files

Real data should be pulled from:
- `src/data/personal.ts` - Personal information
- `src/data/timeline.ts` - Education and career timeline
- `src/data/projects.ts` - Project details

---

## Best Practices

### For Recruiters (Quick Overview)

✅ **DO:**
- Use real metrics (numbers, percentages, scale)
- Be specific about technologies
- Show progression in career
- Include links to verify claims

❌ **DON'T:**
- Use generic descriptions ("Worked on various projects")
- Inflate skills (be honest about proficiency levels)
- Include irrelevant technologies
- Make unverifiable claims

### For Content

✅ **Focus on:**
- Business impact (revenue, users, performance)
- Technical depth (architecture, scale, challenges)
- Leadership/collaboration
- Problem-solving stories

❌ **Avoid:**
- Jargon without context
- Tasks without results
- Technologies without application
- Exaggeration

---

## Testing Your Changes

1. **Development:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`

2. **Build:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Check:**
   - All links work
   - Data is accurate
   - No typos
   - Professional tone
   - Mobile responsive

---

## Deployment

```bash
npm run build
npm run deploy
```

This builds and deploys to GitHub Pages.

---

## Need Help?

- Review example portfolios in the tech industry
- Ask trusted colleagues to review
- Test with real recruiters
- Keep iterating based on feedback
