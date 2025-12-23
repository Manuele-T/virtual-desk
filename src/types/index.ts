export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  screenshot: string;
  repoUrl: string;
}

export type ViewMode = 'overview' | 'focus';