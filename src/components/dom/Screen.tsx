import React from 'react';
import { useStore } from '../../stores/useStore';
import { projects } from '../../data/projects';

const LaptopScreen: React.FC = () => {
  const currentProjectIndex = useStore((state) => state.currentProjectIndex);
  const nextProject = useStore((state) => state.nextProject);
  const prevProject = useStore((state) => state.prevProject);
  
  const project = projects[currentProjectIndex];

  return (
    <div className="w-[800px] h-[500px] bg-neutral-900 text-white font-sans flex flex-col overflow-hidden select-none border border-neutral-800">
      {/* Header / OS Bar */}
      <div className="h-8 bg-neutral-800 flex items-center px-4 justify-between border-b border-neutral-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-neutral-400 font-mono">portfolio.os — v1.2</div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex bg-black relative">
        {/* Project Image Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.screenshot} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
        </div>

        {/* Info */}
        <div className="relative z-10 p-12 flex flex-col justify-end w-full">
          <div className="mb-2 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-xs font-mono text-cyan-400 border border-white/5">
                {t}
              </span>
            ))}
          </div>
          
          <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">{project.title}</h1>
          <p className="text-lg text-neutral-300 max-w-lg mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-4">
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
            >
              View Code
            </a>
            
            <div className="flex gap-2 ml-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); prevProject(); }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                &larr;
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextProject(); }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
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