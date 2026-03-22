export interface SkillCategory {
  name: string
  icon: string
  skills: { name: string; level: number }[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: "AI / Machine Learning",
    icon: "🧠",
    skills: [
      { name: "Python", level: 5 },
      { name: "PyTorch", level: 4 },
      { name: "TensorFlow", level: 4 },
      { name: "Scikit-learn", level: 5 },
      { name: "Computer Vision", level: 4 },
      { name: "NLP / Transformers", level: 4 },
      { name: "Causal Discovery", level: 4 },
    ],
  },
  {
    name: "Web & Frontend",
    icon: "🌐",
    skills: [
      { name: "Vue.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "React", level: 3 },
      { name: "Three.js", level: 4 },
      { name: "HTML / CSS", level: 5 },
    ],
  },
  {
    name: "Backend & Infrastructure",
    icon: "☁️",
    skills: [
      { name: "FastAPI", level: 4 },
      { name: "Rust", level: 3 },
      { name: "Docker", level: 4 },
      { name: "WebRTC", level: 3 },
      { name: "PostgreSQL", level: 3 },
      { name: "Firebase", level: 3 },
    ],
  },
  {
    name: "Languages",
    icon: "🌏",
    skills: [
      { name: "English (Native)", level: 5 },
      { name: "Japanese (Business)", level: 4 },
      { name: "Cantonese (Native)", level: 5 },
      { name: "Mandarin", level: 3 },
    ],
  },
]
