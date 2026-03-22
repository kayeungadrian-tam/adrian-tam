declare module 'vue-sequential-entrance';
declare module 'vue-responsive-video-background-player';

declare module 'troika-three-text' {
  import * as THREE from 'three';
  
  export class Text extends THREE.Group {
    text?: string;
    fontSize?: number;
    color?: string | number;
    fillOpacity?: number;
    outlineWidth?: number | string;
    outlineColor?: string | number;
    anchorX?: 'left' | 'center' | 'right';
    anchorY?: 'top' | 'middle' | 'bottom';
    depthOffset?: number;
    castShadow: boolean;
    receiveShadow: boolean;
    material?: THREE.Material;
    textRenderInfo?: {
      blockBounds?: [number, number, number, number];
    };
    sync(callback?: () => void): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  export * from 'three/examples/jsm/loaders/GLTFLoader';
}

declare module 'three/examples/jsm/loaders/DRACOLoader.js' {
  export * from 'three/examples/jsm/loaders/DRACOLoader';
}

type TroikaLabel = import('troika-three-text').Text;
