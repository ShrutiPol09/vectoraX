import React from 'react';
import * as Icons from 'lucide-react';
import { ToolType } from '../../types';
import { TOOLS } from '../../constants';

interface ToolbarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, setActiveTool, onUndo, onRedo, onClear }) => {
  return (
    <div className="w-16 flex flex-col items-center bg-surface border-r border-white/10 py-4 gap-4 z-20">
      
      {/* Primary Tools */}
      <div className="flex flex-col gap-2 w-full px-2">
        {TOOLS.map((tool) => {
          // Dynamic Icon Component
          const IconComponent = (Icons as any)[tool.icon] || Icons.HelpCircle;
          const isActive = activeTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-3 rounded-lg flex justify-center transition-all ${
                isActive 
                  ? 'bg-primary text-black shadow-neon-cyan' 
                  : 'text-gray-400 hover:text-white hover:bg-surfaceHighlight'
              }`}
              title={tool.label}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>

      <div className="h-px w-8 bg-white/10 my-2"></div>

      {/* Action Tools */}
      <div className="flex flex-col gap-2 w-full px-2">
         <button onClick={onUndo} className="p-3 text-gray-400 hover:text-white rounded-lg hover:bg-surfaceHighlight" title="Undo">
           <Icons.Undo size={20} />
         </button>
         <button onClick={onRedo} className="p-3 text-gray-400 hover:text-white rounded-lg hover:bg-surfaceHighlight" title="Redo">
           <Icons.Redo size={20} />
         </button>
         <button onClick={onClear} className="p-3 text-red-500 hover:text-red-400 rounded-lg hover:bg-surfaceHighlight" title="Clear Canvas">
           <Icons.Trash2 size={20} />
         </button>
      </div>
    </div>
  );
};

export default Toolbar;
