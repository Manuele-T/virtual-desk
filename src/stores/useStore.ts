import { create } from 'zustand';
import { ViewMode } from '../types';
import { projects } from '../data/projects';

interface State {
  viewMode: ViewMode;
  currentProjectIndex: number;
}

interface Actions {
  setFocus: () => void;
  setOverview: () => void;
  nextProject: () => void;
  prevProject: () => void;
}

export const useStore = create<State & Actions>((set) => ({
  viewMode: 'overview',
  currentProjectIndex: 0,
  
  setFocus: () => set({ viewMode: 'focus' }),
  setOverview: () => set({ viewMode: 'overview' }),
  
  nextProject: () => set((state) => ({
    currentProjectIndex: (state.currentProjectIndex + 1) % projects.length
  })),
  
  prevProject: () => set((state) => ({
    currentProjectIndex: (state.currentProjectIndex - 1 + projects.length) % projects.length
  })),
}));