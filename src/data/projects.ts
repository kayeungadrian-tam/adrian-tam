export interface Project {
  name: string
  description: string
  link: string
  img: string | null
  tags: string[]
  overview: string
  featured?: boolean
}

const projects: Project[] = [
  {
    name: "Chatixia Mesh",
    description:
      "A decentralized P2P agent networking framework enabling AI agents to communicate directly via encrypted WebRTC DataChannels.",
    link: "https://github.com/kayeungadrian-tam/chatixia-mesh",
    img: null,
    tags: ["Rust", "Python", "React", "WebRTC", "P2P", "AI Agents"],
    overview:
      "Decentralized mesh network for AI agent communication. Features a Rust registry + WebRTC sidecar, Python agent framework with 29+ skills, React Hub dashboard, full mesh topology, sidecar pattern, CLI tools, invite codes, and multi-LLM support.",
    featured: true,
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
