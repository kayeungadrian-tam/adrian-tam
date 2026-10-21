export interface Award {
  emoji: string
  name: string
  year: string
  description: string
  link?: string
}

export interface PressItem {
  date: string
  outlet: string
  title: string
  note: string
  links: { label: string; url: string }[]
}

export interface Talk {
  date: string
  event: string
  title: string
  note?: string
}

export const awards: Award[] = [
  {
    emoji: '🚀',
    name: 'IPA MITOU Advanced 2026',
    year: '2026 · Selected',
    description:
      'PolterHub, a context and governance layer for physical-AI agents. Full-stack lead on the selected project.',
    link: 'https://www.ipa.go.jp/jinzai/mitou/advanced/2026first/gaiyou-kj-2.html',
  },
  {
    emoji: '📜',
    name: 'U.S. Patent Pending',
    year: '2026 · Filed Apr',
    description:
      'First-listed inventor on a U.S. patent application for a multi-agent AI orchestration system.',
  },
  {
    emoji: '🏆',
    name: 'IBM Consulting Award Japan',
    year: '2025 Q1 · Team',
    description:
      'Team award for the Aktio indirect-procurement transformation, the program behind the AI quote-processing system.',
  },
  {
    emoji: '⚛️',
    name: 'IBM Community Japan Knowledge Mall Research Award',
    year: '2024 · 2025 · Working group',
    description:
      "Two years of quantum-computing working groups: quantum ML and quantum cellular automata (2024-B-06), then Shor's algorithm and quantum ML (2025-B-05-b).",
  },
  {
    emoji: '🏅',
    name: "IBM Manager's Choice Award",
    year: '2024',
    description:
      'Recognition for outstanding contributions to AI projects at IBM Japan.',
  },
  {
    emoji: '🎖️',
    name: 'MEXT Scholarship',
    year: '2015',
    description:
      'Japanese Government scholarship for a one-year exchange at Hiroshima University.',
  },
]

export const press: PressItem[] = [
  {
    date: '2026-07-13',
    outlet: 'IBM Japan Newsroom · Nikkei',
    title:
      'アクティオ、日本IBMの支援のもと、見積確認から調達システムへの発注情報登録までの調達業務をAIにより自動化',
    note:
      'Aktio and IBM Japan announce AI automation of indirect procurement, from quote checking to order registration in the procurement system (~230k purchases a year, final approval kept with people). I am the technical lead on the system.',
    links: [
      {
        label: 'IBM Newsroom',
        url: 'https://jp.newsroom.ibm.com/2026-07-13-AKTIO-Automates-Procurement',
      },
      {
        label: 'Nikkei',
        url: 'https://www.nikkei.com/article/DGXZRSP709780_T10C26A7000000/',
      },
    ],
  },
  {
    date: '2026-06-30',
    outlet: 'IPA (Information-technology Promotion Agency, Japan)',
    title: '未踏アドバンスト事業 2026年度上期：機器群を自律エージェント化し文脈を統合する物理AI基盤',
    note:
      "IPA's project page for PolterHub, selected for MITOU Advanced 2026 H1: a platform that observes, verifies and records why an AI agent acts on the physical world.",
    links: [
      {
        label: 'IPA',
        url: 'https://www.ipa.go.jp/jinzai/mitou/advanced/2026first/gaiyou-kj-2.html',
      },
    ],
  },
]

export const talks: Talk[] = [
  {
    date: 'May 2026',
    event: 'ISE Technical Conference 2026',
    title: 'The Future of BPO Transformed by AI Agents',
    note: 'Audience rating 4.47 / 5',
  },
  {
    date: 'Aug 2025',
    event: 'ISE Technical Seminar',
    title: 'GenAI Week Silicon Valley 2025 report',
    note: 'Co-presented',
  },
  {
    date: 'Jun 2024',
    event: 'ISE Technical Conference 2024',
    title: 'Evolving AI Virtual Agents: RAG Patterns with watsonx',
    note: 'Co-presented',
  },
]
