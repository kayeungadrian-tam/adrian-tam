export interface ImpactCaseStudy {
  client: string
  title: string
  status: string
  metric?: string
  description: string
  stack: string[]
  source?: string
}

const impact: ImpactCaseStudy[] = [
  {
    client: "Aktio",
    title: "Quote-to-Procurement AI Automation",
    status: "Production delivery · Publicly announced",
    metric:
      "23万件/年 indirect-procurement transactions; approximately half involve ad-hoc quotes",
    description:
      "I built the core system largely from scratch and led delivery from the first production release in July 2025. The multimodal workflow reads irregular supplier quotes, validates line items, and connects ServiceNow to SAP Ariba while preserving human approval. Guardrails, Langfuse observability, audit evidence, and operator feedback loops keep the automation controlled and continuously improving.",
    stack: [
      "Python",
      "Multimodal LLMs",
      "OCR",
      "ServiceNow",
      "SAP Ariba",
      "Langfuse",
    ],
    source: "https://jp.newsroom.ibm.com/2026-07-13-AKTIO-Automates-Procurement",
  },
  {
    client: "ENEOS",
    title: "Explainable Quote Validation",
    status: "Live across 16 plants",
    metric: "Up to 83% less validation time",
    description:
      "Built from 10,500+ historical quotes, the system evaluates six categories in 10–30 seconds and returns evidence-backed OK, NG, or Review decisions. Confidence indicators and review queues help people focus their attention, while human override and audit trails keep final judgment transparent and accountable.",
    stack: [
      "FastAPI",
      "React",
      "Azure OpenAI",
      "AI Search",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    client: "IPA Mitou Advanced",
    title: "Physical AI Context & Governance Platform",
    status: "Selected project · In development",
    description:
      "Developing a context and responsibility layer for Physical AI agents that unifies fragmented sensor, API, and device signals. The platform combines harness engineering, Agent Traps, observation, verification, governance, and action recording so autonomous behavior can be evaluated, constrained, and explained.",
    stack: [
      "AI Agents",
      "Context Engineering",
      "Observability",
      "Governance",
      "Physical AI",
    ],
    source:
      "https://www.ipa.go.jp/jinzai/mitou/advanced/2026first/gaiyou-kj-2.html",
  },
]

export default impact
