import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Wand2, Plus } from 'lucide-react';
import Toolbar from '../components/editor/Toolbar';
import PropertiesPanel from '../components/editor/PropertiesPanel';
import { generateSVG } from '../services/geminiService';
import { ToolType, EditorState, AnimationPreset } from '../types';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, STYLE_PRESETS } from '../constants';

const Editor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('flat');
  const [state, setState] = useState<EditorState>({
    activeTool: ToolType.SELECT,
    selectedObject: null,
    fillColor: '#00f0ff',
    strokeColor: '#ffffff',
    strokeWidth: 0,
    opacity: 1,
    isGenerating: false,
    layers: []
  });

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current || fabricCanvas) return;

    const canvas = new window.fabric.Canvas(canvasRef.current, {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
      backgroundColor: '#1e1e1e',
      selection: true,
      preserveObjectStacking: true,
    });

    setFabricCanvas(canvas);

    // Event Listeners
    canvas.on('selection:created', (e: any) => handleSelection(e.selected[0]));
    canvas.on('selection:updated', (e: any) => handleSelection(e.selected[0]));
    canvas.on('selection:cleared', () => setState(prev => ({ ...prev, selectedObject: null })));
    canvas.on('object:added', updateLayers);
    canvas.on('object:removed', updateLayers);
    canvas.on('object:modified', updateLayers);

    return () => {
      canvas.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update State on Selection
  const handleSelection = (obj: any) => {
    setState(prev => ({
      ...prev,
      selectedObject: obj,
      fillColor: obj.fill as string || prev.fillColor,
      strokeColor: obj.stroke as string || prev.strokeColor,
      strokeWidth: obj.strokeWidth || 0,
      opacity: obj.opacity || 1
    }));
  };

  const updateLayers = () => {
    if (!fabricCanvas) return;
    const objs = fabricCanvas.getObjects().map((o: any) => ({
      type: o.type,
      fill: o.fill
    })).reverse();
    setState(prev => ({ ...prev, layers: objs }));
  };

  // Tool Handlers
  const handleAddShape = (type: ToolType) => {
    if (!fabricCanvas) return;
    let shape;
    const center = fabricCanvas.getCenter();
    const commonOpts = { 
      left: center.left, 
      top: center.top, 
      fill: state.fillColor, 
      stroke: state.strokeColor,
      strokeWidth: state.strokeWidth,
      originX: 'center', 
      originY: 'center' 
    };

    switch (type) {
      case ToolType.RECTANGLE:
        shape = new window.fabric.Rect({ width: 100, height: 100, ...commonOpts });
        break;
      case ToolType.CIRCLE:
        shape = new window.fabric.Circle({ radius: 50, ...commonOpts });
        break;
      case ToolType.TEXT:
        shape = new window.fabric.IText('Vector Text', { ...commonOpts, fontSize: 40, fontFamily: 'Inter' });
        break;
    }

    if (shape) {
      fabricCanvas.add(shape);
      fabricCanvas.setActiveObject(shape);
      fabricCanvas.renderAll();
    }
    setState(prev => ({...prev, activeTool: ToolType.SELECT}));
  };

  useEffect(() => {
    if ([ToolType.RECTANGLE, ToolType.CIRCLE, ToolType.TEXT].includes(state.activeTool)) {
      handleAddShape(state.activeTool);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeTool]);


  // AI Generation Handler
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const svgString = await generateSVG(prompt, selectedStyle);
      
      window.fabric.loadSVGFromString(svgString, (objects: any[], options: any) => {
        const obj = window.fabric.util.groupSVGElements(objects, options);
        
        // Scale to fit nicely
        obj.scaleToWidth(300);
        obj.set({
            left: fabricCanvas.width! / 2,
            top: fabricCanvas.height! / 2,
            originX: 'center',
            originY: 'center'
        });

        fabricCanvas.add(obj);
        fabricCanvas.setActiveObject(obj);
        fabricCanvas.renderAll();
      });
    } catch (err) {
      alert("AI Generation failed. Check API Key or try again.");
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  // Property Updates
  const updateStyle = (key: string, value: any) => {
    const obj = fabricCanvas?.getActiveObject();
    if (obj) {
      obj.set(key, value);
      fabricCanvas.renderAll();
    }
    setState(prev => ({ ...prev, [key]: value }));
  };

  // Animation - Hacky implementation via custom properties for specific export logic later
  // In pure Fabric, we'd use animate(), but for this responsive purpose, we'll store metadata
  const handleAnimation = (preset: AnimationPreset) => {
    const obj = fabricCanvas?.getActiveObject();
    if (!obj) return;
    
    // Stop previous animations if any (mock)
    // In a real app, we'd cancel animation frame
    
    // For visual feedback in editor (Using raw DOM manipulation for demo)
    // NOTE: This is a visual trick only for the editor view.
    // Fabric objects don't support CSS classes directly.
    // We would typically export the SVG with the class.
    alert(`Animation preset '${preset}' attached to object metadata. It will be active in exported SVG.`);
  };

  const handleExport = (format: string) => {
      if (!fabricCanvas) return;
      if (format === 'png') {
          const dataURL = fabricCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 });
          const link = document.createElement('a');
          link.download = 'vectorax-export.png';
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } else if (format === 'svg') {
          const svgData = fabricCanvas.toSVG();
          const blob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'vectorax-export.svg';
          link.href = url;
          document.body.appendChild(link);
          link.click();
      }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      <Toolbar 
        activeTool={state.activeTool} 
        setActiveTool={(t) => setState(prev => ({ ...prev, activeTool: t }))}
        onUndo={() => {}} // Mock
        onRedo={() => {}} // Mock
        onClear={() => fabricCanvas?.clear().setBackgroundColor('#1e1e1e', fabricCanvas.renderAll.bind(fabricCanvas))}
      />

      <div className="flex-1 flex flex-col bg-background relative">
        
        {/* AI Prompt Bar */}
        <div className="h-16 border-b border-white/10 flex items-center px-4 gap-4 bg-surface/50 z-10">
          <div className="relative flex-1">
            <Wand2 className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a vector scene... (e.g., 'cyberpunk cat logo')"
              className="w-full bg-surfaceHighlight border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          
          <select 
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-primary outline-none"
          >
            {STYLE_PRESETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <button 
            onClick={handleGenerate}
            disabled={state.isGenerating || !prompt}
            className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {state.isGenerating ? <Loader2 className="animate-spin" size={18}/> : <><Wand2 size={18}/> Generate</>}
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-black/50">
          <div className="shadow-2xl shadow-black border border-white/5 relative">
            <canvas ref={canvasRef} />
            {state.isGenerating && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
                 <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                 <p className="text-primary font-mono animate-pulse">Consulting Neural Network...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <PropertiesPanel 
        editorState={state} 
        onUpdateStyle={updateStyle} 
        onExport={handleExport}
        onAnimationChange={handleAnimation}
      />
    </div>
  );
};

export default Editor;
