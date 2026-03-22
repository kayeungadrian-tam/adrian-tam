import { ref } from 'vue'
import * as THREE from 'three'

export type ThemeMode = 'dark' | 'light'

export const createThemeManager = (options: { storageKey: string }) => {
  const theme = ref<ThemeMode>('dark')

  const applyTheme = (value: ThemeMode) => {
    theme.value = value
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', value)
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(options.storageKey, value)
    }
  }

  const initTheme = () => {
    if (typeof window === 'undefined') {
      return
    }
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(options.storageKey) : null
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored)
      return
    }
    const prefersDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
    applyTheme(prefersDark ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const applySceneTheme = (params: {
    scene: THREE.Scene | null
    spotlightConeMaterial?: THREE.MeshBasicMaterial | null
    createSkybox: () => THREE.Texture | null
    setSkyboxTexture: (texture: THREE.Texture | null) => void
  }) => {
    const { scene, spotlightConeMaterial, createSkybox, setSkyboxTexture } = params
    if (!scene || !(scene.fog instanceof THREE.FogExp2)) {
      return
    }
    if (theme.value === 'dark') {
      scene.fog.color.set(0x2a2030)
      scene.fog.density = 0.02
    } else {
      scene.fog.color.set(0xe8edf3)
      scene.fog.density = 0.025
    }
    if (spotlightConeMaterial) {
      if (theme.value === 'dark') {
        spotlightConeMaterial.opacity = 0.15
        spotlightConeMaterial.color.set(0xd6e4ff)
      } else {
        spotlightConeMaterial.opacity = 0.06
        spotlightConeMaterial.color.set(0xfff4e0)
      }
    }
    const nextSkybox = createSkybox()
    setSkyboxTexture(nextSkybox)
    if (scene) {
      scene.background = nextSkybox
    }
  }

  return {
    theme,
    applyTheme,
    initTheme,
    toggleTheme,
    applySceneTheme,
  }
}
