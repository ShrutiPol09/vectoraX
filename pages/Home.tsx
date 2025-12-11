import React from 'react';
import { ArrowRight, Wand2, Zap, Share2 } from 'lucide-react';
import { TAGLINE } from '../constants';

const Home: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4 animate-pulse">
          v2.0 Beta is Live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="text-white">Generate Vectors</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            With Pure Intelligence
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {TAGLINE} Turn text into scalable SVGs instantly. Edit, animate, and export for your next big project.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button 
            onClick={() => onNavigate('editor')}
            className="px-8 py-4 rounded-lg bg-primary text-black font-bold text-lg hover:bg-cyan-300 transition-all shadow-neon-cyan flex items-center gap-2 group"
          >
            Start Creating <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('gallery')}
            className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all"
          >
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto z-10">
        {[
          { icon: Wand2, title: "AI Generation", desc: "Powered by Gemini 2.5. Describe it, see it." },
          { icon: Zap, title: "Real-time Editor", desc: "Built-in professional vector editing tools." },
          { icon: Share2, title: "Instant Export", desc: "SVG, PNG, or JSON for developers." }
        ].map((feature, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-surfaceHighlight flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
              <feature.icon />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
