import React from 'react';
import { useStore } from '@/stores/useStore';

const HUD: React.FC = () => {
  const viewMode = useStore((state) => state.viewMode);
  const setOverview = useStore((state) => state.setOverview);

  if (viewMode === 'overview') {
    return (
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
        <div className="bg-black/50 backdrop-blur-sm text-white/70 px-6 py-2 rounded-full text-sm font-medium border border-white/10 animate-pulse">
          Explore the desk. Click the laptop to enter.
        </div>
      </div>
    );
  }

  return (
    <div 
      className="absolute inset-0 pointer-events-auto"
      onClick={() => setOverview()}
    >
      <div className="absolute top-10 right-10">
         <button className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold">
           Exit Focus
         </button>
      </div>
    </div>
  );
};

export default HUD;