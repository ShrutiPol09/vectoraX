export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface SVGProject {
  id: string;
  name: string;
  thumbnail: string; // Data URL
  createdAt: string;
  updatedAt: string;
  json: any; // Fabric JSON representation
}

export enum ToolType {
  SELECT = 'SELECT',
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
  TRIANGLE = 'TRIANGLE',
  TEXT = 'TEXT',
  DRAW = 'DRAW',
  AI_GEN = 'AI_GEN',
}

export enum AnimationPreset {
  NONE = 'none',
  BOUNCE = 'bounce',
  SPIN = 'spin',
  PULSE = 'pulse',
  FLOAT = 'float',
}

export interface EditorState {
  activeTool: ToolType;
  selectedObject: any | null; // Fabric object
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  opacity: number;
  isGenerating: boolean;
  layers: any[];
}

export interface AIPreset {
  id: string;
  name: string;
  promptModifier: string;
}

// Global declaration for Fabric.js loaded via CDN
declare global {
  interface Window {
    fabric: any;
  }
}
