export interface SkillCategory {
  name: string
  icon: string
  skills: { name: string; level: number }[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Applied AI",
    icon: "🧠",
    skills: [
      { name: "Python", level: 5 },
      { name: "Multimodal LLMs", level: 5 },
      { name: "RAG / Retrieval", level: 5 },
      { name: "Document Intelligence", level: 5 },
      { name: "Prompt & Workflow Design", level: 5 },
      { name: "Computer Vision", level: 4 },
      { name: "Causal Inference", level: 4 },
    ],
  },
  {
    name: "AI Delivery",
    icon: "🚀",
    skills: [
      { name: "FastAPI", level: 5 },
      { name: "Azure OpenAI", level: 5 },
      { name: "Langfuse", level: 4 },
      { name: "Docker", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Human-in-the-loop", level: 5 },
    ],
  },
  {
    name: "Product Engineering",
    icon: "🛠️",
    skills: [
      { name: "TypeScript", level: 5 },
      { name: "React", level: 4 },
      { name: "Vue.js", level: 5 },
      { name: "Rust", level: 4 },
      { name: "WebRTC", level: 4 },
      { name: "ServiceNow", level: 4 },
      { name: "SAP Ariba", level: 4 },
    ],
  },
]
