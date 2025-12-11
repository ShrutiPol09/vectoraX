import React from 'react';
import { Layers, Download, Sliders, Type, Palette, Video } from 'lucide-react';
import { EditorState, AnimationPreset } from '../../types';
import { ANIMATION_CSS } from '../../constants';

interface PropertiesPanelProps {
  editorState: EditorState;
  onUpdateStyle: (key: string, value: any) => void;
  onExport: (format: 'svg' | 'png' | 'json') => void;
  onAnimationChange: (preset: AnimationPreset) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  editorState, 
  onUpdateStyle, 
  onExport,
  onAnimationChange
}) => {
  const [activeTab, setActiveTab] = React.useState<'props' | 'layers' | 'anim'>('props');

  return (
    <div className="w-72 bg-surface border-l border-white/10 flex flex-col h-full">
      
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          onClick={() => setActiveTab('props')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'props' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
        >
          Design
        </button>
        <button 
          onClick={() => setActiveTab('anim')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'anim' ? 'text-secondary border-b-2 border-secondary' : 'text-gray-500'}`}
        >
          Animate
        </button>
        <button 
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'layers' ? 'text-white border-b-2 border-white' : 'text-gray-500'}`}
        >
          Layers
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        
        {/* Properties Tab */}
        {activeTab === 'props' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Fill Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={editorState.fillColor} 
                  onChange={(e) => onUpdateStyle('fill', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border border-white/20"
                />
                <input 
                  type="text" 
                  value={editorState.fillColor}
                  onChange={(e) => onUpdateStyle('fill', e.target.value)}
                  className="bg-surfaceHighlight text-white text-sm px-2 py-2 rounded w-full border border-white/10 focus:border-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Stroke</label>
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="color" 
                  value={editorState.strokeColor} 
                  onChange={(e) => onUpdateStyle('stroke', e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer bg-transparent border border-white/20"
                />
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={editorState.strokeWidth}
                  onChange={(e) => onUpdateStyle('strokeWidth', parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Opacity</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={editorState.opacity}
                onChange={(e) => onUpdateStyle('opacity', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        )}

        {/* Animation Tab */}
        {activeTab === 'anim' && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400">Select an object and choose an animation style.</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(AnimationPreset).map((preset) => (
                <button
                  key={preset}
                  onClick={() => onAnimationChange(preset)}
                  className="px-3 py-2 bg-surfaceHighlight hover:bg-white/10 rounded text-sm text-gray-300 capitalize border border-white/5"
                >
                  {preset}
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded text-xs text-blue-200">
              Note: Animations are CSS-based previews. Export as HTML/CSS to retain motion.
            </div>
          </div>
        )}

        {/* Layers Tab (Mock) */}
        {activeTab === 'layers' && (
          <div className="space-y-2">
             {editorState.layers.length === 0 && <p className="text-sm text-gray-500 italic">No objects on canvas.</p>}
             {editorState.layers.map((layer, idx) => (
               <div key={idx} className="flex items-center justify-between p-2 bg-surfaceHighlight rounded border border-white/5">
                 <span className="text-sm text-gray-300">{layer.type}</span>
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.fill || '#fff' }}></div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Export Section (Bottom Sticky) */}
      <div className="p-4 border-t border-white/10 bg-surfaceHighlight/30">
        <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Export</label>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => onExport('svg')} className="bg-surface hover:bg-white/10 border border-white/20 text-xs py-2 rounded text-white font-medium">SVG</button>
          <button onClick={() => onExport('png')} className="bg-surface hover:bg-white/10 border border-white/20 text-xs py-2 rounded text-white font-medium">PNG</button>
          <button onClick={() => onExport('json')} className="bg-surface hover:bg-white/10 border border-white/20 text-xs py-2 rounded text-white font-medium">JSON</button>
        </div>
      </div>
      <style>{ANIMATION_CSS}</style>
    </div>
  );
};

export default PropertiesPanel;
