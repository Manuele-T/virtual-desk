import React from 'react';
import { useStore } from '../../stores/useStore';
import { projects } from '../../data/projects';

const LaptopScreen: React.FC = () => {
  const currentProjectIndex = useStore((state) => state.currentProjectIndex);
  const nextProject = useStore((state) => state.nextProject);
  const prevProject = useStore((state) => state.prevProject);
  const setFocus = useStore((state) => state.setFocus);
  const viewMode = useStore((state) => state.viewMode);
  
  const project = projects[currentProjectIndex];

  return (
    <div 
      // FIX: Update dimensions to match the Laptop.tsx container
      className="w-[1280px] h-[720px] bg-neutral-900 text-white font-sans flex flex-col overflow-hidden select-none border border-neutral-800"
      onClick={() => {
        if (viewMode === 'overview') setFocus();
      }}
    >
      {/* Header / OS Bar */}
      <div className="h-10 bg-neutral-800 flex items-center px-6 justify-between border-b border-neutral-700 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-neutral-400 font-mono">portfolio.os — v1.3</div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex bg-black relative">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.screenshot} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
        </div>

        {/* Info - Padded for larger screen */}
        <div className="relative z-10 p-16 flex flex-col justify-end w-full">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-sm font-mono text-cyan-400 border border-white/5">
                {t}
              </span>
            ))}
          </div>
          
          <h1 className="text-7xl font-bold mb-6 tracking-tight text-white">{project.title}</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mb-10 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-6">
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors"
            >
              View Code
            </a>
            
            <div className="flex gap-3 ml-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); prevProject(); }}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xl"
              >
                &larr;
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextProject(); }}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xl"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopScreen;