export type AudioController = {
  init: () => void
  toggle: () => void
  start: () => void
  stop: () => void
  isEnabled: () => boolean
}

export const createAudioController = (options: {
  url: string
  volume?: number
  enabled?: boolean
}): AudioController => {
  let audio: HTMLAudioElement | null = null
  let enabled = options.enabled ?? true

  const init = () => {
    if (audio) return
    audio = new Audio(options.url)
    audio.loop = true
    audio.volume = options.volume ?? 0.25
    if (!enabled) {
      audio.pause()
    }
  }

  const toggle = () => {
    enabled = !enabled
    if (!audio) return
    if (enabled) {
      void audio.play()
    } else {
      audio.pause()
    }
  }

  const start = () => {
    if (!audio || !enabled) return
    void audio.play()
  }

  const stop = () => {
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }

  const isEnabled = () => enabled

  return {
    init,
    toggle,
    start,
    stop,
    isEnabled,
  }
}
