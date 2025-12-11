import { AIPreset, ToolType } from "./types";

export const APP_NAME = "VectoraX";
export const TAGLINE = "AI Vector Creation. Unlimited.";

export const DEFAULT_CANVAS_WIDTH = 800;
export const DEFAULT_CANVAS_HEIGHT = 600;

export const STYLE_PRESETS: AIPreset[] = [
  { id: 'flat', name: 'Flat Design', promptModifier: 'flat vector art, minimal, clean lines, solid colors, no gradients' },
  { id: 'neon', name: 'Neon Cyberpunk', promptModifier: 'cyberpunk style, neon glowing outlines, dark background, futuristic' },
  { id: 'sketch', name: 'Hand Drawn', promptModifier: 'black ink sketch, hand drawn style, rough lines, white background' },
  { id: 'logo', name: 'Logo', promptModifier: 'minimalist logo, simple shape, iconic, scalable vector graphics' },
  { id: 'sticker', name: 'Sticker', promptModifier: 'die-cut sticker style, thick white border, cute, vibrant colors' },
];

export const ANIMATION_CSS = `
  @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
  @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-20px);} 60% {transform: translateY(-10px);} }
  @keyframes spin { 100% { transform: rotate(360deg); } }
  @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
  
  .anim-float { animation: float 3s ease-in-out infinite; }
  .anim-bounce { animation: bounce 2s infinite; }
  .anim-spin { animation: spin 4s linear infinite; }
  .anim-pulse { animation: pulse 2s infinite; }
`;

export const TOOLS = [
  { id: ToolType.SELECT, icon: 'MousePointer', label: 'Select' },
  { id: ToolType.RECTANGLE, icon: 'Square', label: 'Rect' },
  { id: ToolType.CIRCLE, icon: 'Circle', label: 'Circle' },
  { id: ToolType.TEXT, icon: 'Type', label: 'Text' },
  { id: ToolType.DRAW, icon: 'PenTool', label: 'Draw' },
];
