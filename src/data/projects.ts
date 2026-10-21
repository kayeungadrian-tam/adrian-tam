export interface Project {
  name: string
  description: string
  link?: string
  site?: string
  img: string | null
  tags: string[]
  overview: string
  featured?: boolean
  highlights?: { icon: string; label: string }[]
  diagram?: [string, string, string, string, string]
}

const projects: Project[] = [
  {
    name: "Interlatch",
    description:
      "Shared memory for coding agents: every session recorded locally, every lesson linked to where it came from.",
    link: "https://github.com/Chatixia-AI/interlatch",
    site: "https://interlatch.com",
    img: null,
    tags: ["Python", "MCP", "Claude Code", "Codex", "Firebase", "PyPI"],
    overview:
      "Open-source shared memory for Claude Code, Codex, GitHub Copilot, IBM Bob, Antigravity and OpenCode. Interlatch records every session on your own machine, extracts the fixes, gotchas and decisions agents learn, and serves them back through a CLI, an MCP server and a team hub. My IBM team uses the hub to reuse what its agents have learned.",
    featured: true,
    highlights: [
      { icon: "🤖", label: "6 Coding Agents" },
      { icon: "🔌", label: "MCP Server" },
      { icon: "🧠", label: "Linked Lessons" },
      { icon: "👥", label: "Team Hub" },
      { icon: "🔒", label: "Local-first" },
      { icon: "📦", label: "MIT · on PyPI" },
    ],
    diagram: ["Claude Code", "Codex", "Interlatch", "Team Hub", "MCP"],
  },
  {
    name: "Chatixia Studio",
    description:
      "Short 3D films that explain how software works in about two and a half minutes, with every term explained beside the player.",
    site: "https://studio.chatixia.net",
    img: null,
    tags: ["three.js", "3D", "Explainers", "Firebase"],
    overview:
      "Real-time 3D blueprint-style explainers of technical concepts, part of Chatixia (chatixia.net).",
  },
  {
    name: "Chatixia Mesh",
    description:
      "A working agent-to-agent network on encrypted WebRTC data channels, documented end to end with an 18-lesson course and a threat model.",
    link: "https://github.com/Chatixia-AI/chatixia-mesh",
    site: "https://mesh.chatixia.net",
    img: null,
    tags: ["Rust", "Python", "React", "WebRTC", "P2P", "AI Agents"],
    overview:
      "A decentralized mesh for AI-agent communication: Rust registry and WebRTC sidecar, Python agent framework, React operations hub, CLI tooling and multi-LLM support.",
  },
  {
    name: "MoodX",
    description:
      "A native macOS meeting mixer for Teams, built with Codex for OpenAI Build Week: local-only audio routing, a meeting timer with a protected decision checkpoint, and a 45-second Quiet Think prompt.",
    link: "https://github.com/kayeungadrian-tam/MoodX",
    img: null,
    tags: ["Swift", "SwiftUI", "Core Audio", "whisper.cpp", "Codex"],
    overview:
      "A psychologically safe participation layer for online meetings. Fun is the doorway to participation, and value follows.",
  },
  {
    name: "Bible Search Index",
    description:
      "A bible search engine powered by sentence transformers.",
    link: "https://github.com/kayeungadrian-tam/bible_scraper",
    img: new URL("../assets/projects/thumbnails/bible_search_index.png", import.meta.url).href,
    tags: ["Python", "Gradio", "HuggingFace"],
    overview:
      "A bible search engine powered by sentence transformers.",
  },
  {
    name: "Python Decorators",
    description: "A python package consisting of useful decorators.",
    link: "https://github.com/kayeungadrian-tam/py_decorators",
    img: new URL("../assets/projects/thumbnails/pyDeco_docs.png", import.meta.url).href,
    tags: ["Python", "PyPI", "OSS"],
    overview:
      "A python package consisting of useful decorators.",
  },
  {
    name: "Personal Portfolio",
    description:
      "A personal portfolio website made from scratch in Vue3 with TypeScript.",
    link: "https://github.com/kayeungadrian-tam/adrian-tam",
    img: new URL("../assets/projects/thumbnails/portfolio.png", import.meta.url).href,
    tags: ["Vue3", "TypeScript", "Vercel"],
    overview:
      "A personal portfolio website made from scratch in Vue3 with TypeScript, hosted on Vercel.",
  },
  {
    name: "Image Processing GUI",
    description:
      "A GUI for image processing using OpenCV, PySimpleGUI and Yolov3.",
    link: "https://github.com/kayeungadrian-tam/Image_Processing",
    img: new URL("../assets/projects/thumbnails/image_processing_gui.png", import.meta.url).href,
    tags: ["Python", "OpenCV", "YOLOv3"],
    overview:
      "A GUI for image processing using OpenCV, PySimpleGUI and Yolov3. Test object detection models on preprocessed images in real time.",
  },
  {
    name: "Infinite Virtual Webcam Loop",
    description:
      "A virtual webcam loop using OpenCV, Mediapipe and OBS.",
    link: "https://github.com/kayeungadrian-tam/Infinite-Meeting",
    img: new URL("../assets/projects/thumbnails/infinite_virtual_web_loop.png", import.meta.url).href,
    tags: ["Python", "OpenCV", "Mediapipe", "OBS"],
    overview:
      "Record a video from a webcam and play it on repeat, then send the video to OBS for streaming.",
  },
  {
    name: "Dynamics Bicycle Model Simulation",
    description:
      "A 3D simulation of dynamic bicycle model with PID control.",
    link: "https://github.com/kayeungadrian-tam/Dynamics_Bicycle_Model",
    img: new URL("../assets/projects/thumbnails/dbm_simulation.png", import.meta.url).href,
    tags: ["Python", "Dash", "PID", "ZMQ"],
    overview:
      "A 3D simulation of dynamic bicycle model with PID control, viewable on a web server in real-time.",
  },
  {
    name: "Reinforcement Learning PoC",
    description:
      "Reinforcement learning applied to autonomous driving with obstacle avoidance.",
    link: "https://github.com/kayeungadrian-tam/Reinforcement_Learning",
    img: new URL("../assets/projects/thumbnails/reinforcemenet_learning.png", import.meta.url).href,
    tags: ["TensorFlow", "PyGame", "OpenAI", "RL"],
    overview:
      "A PoC project to apply reinforcement learning to autonomous driving including obstacle avoidance and object pursuit.",
  },
  {
    name: "The Banana Room",
    description:
      "A general purpose mobile application with real-time chatroom and user profiles.",
    link: "https://github.com/kayeungadrian-tam/The-Banana-Room",
    img: new URL("../assets/projects/thumbnails/banana-room.png", import.meta.url).href,
    tags: ["Flutter", "Dart", "Firebase"],
    overview:
      "A general purpose mobile application with real-time chatroom, customizable user profile and a simple puzzle game.",
  },
]

export default projects
