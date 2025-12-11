import React from 'react';
import { Download, Heart } from 'lucide-react';

const MOCK_ITEMS = [
  { id: 1, title: 'Neon Fox', url: 'https://picsum.photos/400/300?random=1', author: 'Alex' },
  { id: 2, title: 'Cyber City', url: 'https://picsum.photos/400/300?random=2', author: 'Sarah' },
  { id: 3, title: 'Abstract Shapes', url: 'https://picsum.photos/400/300?random=3', author: 'Bot' },
  { id: 4, title: 'Logo Concept', url: 'https://picsum.photos/400/300?random=4', author: 'User123' },
];

const Gallery: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Community Gallery</h2>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-surfaceHighlight rounded-lg text-sm text-gray-300 hover:text-white">Trending</button>
            <button className="px-4 py-2 bg-surfaceHighlight rounded-lg text-sm text-gray-300 hover:text-white">Recent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_ITEMS.map((item) => (
          <div key={item.id} className="group bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-1">
            <div className="aspect-square bg-gray-900 relative overflow-hidden">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                 <button className="text-white hover:text-primary"><Heart size={20} /></button>
                 <button className="text-white hover:text-primary"><Download size={20} /></button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white truncate">{item.title}</h3>
              <p className="text-xs text-gray-500">by {item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
