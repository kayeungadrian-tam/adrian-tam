import * as THREE from 'three'
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BloomEffect,
  VignetteEffect,
  DepthOfFieldEffect,
  SSAOEffect,
  NormalPass,
  ToneMappingEffect,
  ToneMappingMode,
  BlendFunction,
  KernelSize,
  ChromaticAberrationEffect,
} from 'postprocessing'

export interface PostProcessingConfig {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  theme: 'dark' | 'light'
}

export interface PostProcessingController {
  composer: EffectComposer
  updateTheme: (theme: 'dark' | 'light') => void
  updateFocusMode: (isFocused: boolean) => void
  resize: (width: number, height: number) => void
  render: () => void
  dispose: () => void
}

/**
 * Creates and manages post-processing effects for the 3D portfolio.
 * Includes Bloom, SSAO, Depth of Field, Vignette, Color Grading,
 * and Chromatic Aberration for cinematic open-world feel.
 */
export function createPostProcessing(config: PostProcessingConfig): PostProcessingController {
  const { renderer, scene, camera, theme } = config

  // Create the effect composer
  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType,
  })

  // Base render pass
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  // Normal pass for SSAO
  const normalPass = new NormalPass(scene, camera)

  // SSAO Effect - Reduced intensity for open world with fewer wall occluders
  const ssaoEffect = new SSAOEffect(camera, normalPass.texture, {
    blendFunction: BlendFunction.MULTIPLY,
    distanceScaling: true,
    distanceThreshold: 0.5,
    distanceFalloff: 0.2,
    rangeThreshold: 0.0005,
    rangeFalloff: 0.001,
    luminanceInfluence: 0.7,
    radius: 0.05,
    intensity: theme === 'dark' ? 1.5 : 1.2,
    bias: 0.025,
    samples: 16,
    rings: 4,
    resolutionScale: 0.5,
  })

  // Bloom Effect - Raised threshold for open world with portals, zone halos, beacons
  const bloomEffect = new BloomEffect({
    blendFunction: BlendFunction.ADD,
    kernelSize: KernelSize.MEDIUM,
    luminanceThreshold: theme === 'dark' ? 0.5 : 0.65,
    luminanceSmoothing: 0.4,
    intensity: theme === 'dark' ? 1.0 : 0.7,
    mipmapBlur: true,
  })

  // Depth of Field Effect - Blurs background when focusing
  const depthOfFieldEffect = new DepthOfFieldEffect(camera, {
    focusDistance: 0.0,
    focalLength: 0.05,
    bokehScale: 2.0,
    resolutionScale: 0.5,
  })
  // Start with DOF disabled (will enable in focus mode)
  depthOfFieldEffect.blendMode.opacity.value = 0

  // Vignette Effect - Darkens edges for cinematic feel
  const vignetteEffect = new VignetteEffect({
    offset: 0.35,
    darkness: theme === 'dark' ? 0.5 : 0.3,
  })

  // Chromatic Aberration - Subtle color fringing at screen edges for cinematic feel
  const chromaticAberrationEffect = new ChromaticAberrationEffect({
    offset: new THREE.Vector2(0.0006, 0.0006),
    radialModulation: true,
    modulationOffset: 0.3,
  })

  // Tone Mapping - Professional color grading
  const toneMappingEffect = new ToneMappingEffect({
    mode: ToneMappingMode.ACES_FILMIC,
    resolution: 256,
    whitePoint: theme === 'dark' ? 4.0 : 5.0,
    middleGrey: theme === 'dark' ? 0.6 : 0.8,
    minLuminance: 0.01,
    averageLuminance: theme === 'dark' ? 0.5 : 1.0,
    adaptationRate: 1.0,
  })

  // Combine effects into a single pass for performance
  const effectPass = new EffectPass(
    camera,
    bloomEffect,
    ssaoEffect,
    vignetteEffect,
    depthOfFieldEffect,
    chromaticAberrationEffect,
    toneMappingEffect
  )

  composer.addPass(normalPass)
  composer.addPass(effectPass)

  /**
   * Updates effects based on theme
   */
  const updateTheme = (newTheme: 'dark' | 'light') => {
    // Bloom adjustments - raised threshold for open world
    const bloomUniforms = bloomEffect.luminanceMaterial.uniforms
    if (bloomUniforms.threshold) {
      bloomUniforms.threshold.value = newTheme === 'dark' ? 0.5 : 0.65
    }
    bloomEffect.intensity = newTheme === 'dark' ? 1.0 : 0.7

    // SSAO adjustments - reduced for open world
    ssaoEffect.intensity = newTheme === 'dark' ? 1.5 : 1.2

    // Vignette adjustments - access through uniforms
    const vignetteUniforms = vignetteEffect.uniforms
    if (vignetteUniforms.get('darkness')) {
      vignetteUniforms.get('darkness')!.value = newTheme === 'dark' ? 0.5 : 0.3
    }
  }

  /**
   * Updates Depth of Field based on focus mode
   */
  const updateFocusMode = (isFocused: boolean) => {
    const targetOpacity = isFocused ? 1.0 : 0.0
    const currentOpacity = depthOfFieldEffect.blendMode.opacity.value
    const diff = targetOpacity - currentOpacity
    depthOfFieldEffect.blendMode.opacity.value += diff * 0.05
  }

  /**
   * Handles window resize
   */
  const resize = (width: number, height: number) => {
    composer.setSize(width, height)
  }

  /**
   * Renders the scene with post-processing
   */
  const render = () => {
    composer.render()
  }

  /**
   * Cleans up resources
   */
  const dispose = () => {
    composer.dispose()
    bloomEffect.dispose()
    ssaoEffect.dispose()
    depthOfFieldEffect.dispose()
    vignetteEffect.dispose()
    chromaticAberrationEffect.dispose()
    toneMappingEffect.dispose()
  }

  return {
    composer,
    updateTheme,
    updateFocusMode,
    resize,
    render,
    dispose,
  }
}
