export interface ImpactCaseStudy {
  client: string
  title: string
  status: string
  metric?: string
  description: string
  stack: string[]
  sources?: { label: string; url: string }[]
}

const impact: ImpactCaseStudy[] = [
  {
    client: "Aktio",
    title: "AI Quote Processing, ServiceNow → SAP Ariba",
    status: "In production · Announced Jul 2026",
    metric:
      "~230k indirect purchases a year, about half with one-off supplier quotes",
    description:
      "Technical lead (3 engineers + 1 junior) since June 2025. Every few minutes the system picks up new ServiceNow purchase requests, reads the attached quotes with Azure Document Intelligence and Azure OpenAI vision, runs about ten compliance checks that mix rules with LLM judgments, and registers the order in SAP Ariba. A person still approves each purchase, and anything that fails goes to review. Langfuse prompt versioning, tracing and dataset evaluation keep changes measurable.",
    stack: [
      "Python",
      "Azure OpenAI",
      "Document Intelligence",
      "ServiceNow",
      "SAP Ariba",
      "Langfuse",
    ],
    sources: [
      {
        label: "Press release",
        url: "https://jp.newsroom.ibm.com/2026-07-13-AKTIO-Automates-Procurement",
      },
      {
        label: "Nikkei",
        url: "https://www.nikkei.com/article/DGXZRSP709780_T10C26A7000000/",
      },
    ],
  },
  {
    client: "Major Japanese oil refiner",
    title: "Explainable Quote Validation",
    status: "In daily use across 16 plants since Apr 2026",
    metric: "~75% shorter review time: 6–9 min per quote vs a 30-min manual reference",
    description:
      "Checks refinery-maintenance quotes against 185 framework agreements (8,533 priced items) and ~10.5k past quotes. LLMs match line items while price verdicts are computed by code, so every OK, NG or Review decision carries its evidence. Operator feedback is triaged automatically, and a prompt fix goes live only if it passes a regression set of real cases.",
    stack: [
      "Azure OpenAI",
      "Content Understanding",
      "Power Automate",
      "Azure Functions",
      "PostgreSQL",
      "React",
    ],
  },
  {
    client: "Japanese energy company",
    title: "Procurement AI Program",
    status: "PoC → won RFP · Jun 2026 – present",
    metric: "98.5% line-level accuracy · 16/16 quote totals matched in the PoC",
    description:
      "An AI pipeline that structures refinery-maintenance contractor quotes and checks them line by line. I shaped the technical solution for a competitive RFP that IBM won: a Databricks lakehouse linking ~28k purchase cases a year across SAP, Ariba and SharePoint, with Copilot Studio agents in Teams. A Copilot Studio agent flow that replaced manual PDF filing is already in production.",
    stack: [
      "Azure OpenAI",
      "Document Intelligence",
      "Databricks",
      "Copilot Studio",
      "Terraform",
    ],
  },
]

export default impact
