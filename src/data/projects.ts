import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'neon-breacher',
    title: 'Neon Breacher',
    description: 'Zero-Asset Arcade Shooter with high-intensity particle effects.',
    tech: ['React', 'Three.js', 'Canvas'], 
    screenshot: '/projects/neonbreacher.jpg',
    repoUrl: 'https://github.com/Manuele-T/neon-breacher'
  },
  {
    id: 'codewise-ai-reviewer',
    title: 'Codewise AI Reviewer',
    description: 'AI-powered code review assistant providing detailed code feedback.',
    tech: ['AI', 'GitHub Actions', 'Automation'],
    screenshot: '/projects/codewise.jpg',
    repoUrl: 'https://github.com/Manuele-T/codewise-ai-reviewer'
  },
  {
    id: 'ai-marketing-agent',
    title: 'AI Marketing Agent',
    description: 'Autonomous agent designed to optimize marketing campaigns and content generation.',
    tech: ['Python', 'LLM', 'LangChain'],
    screenshot: '/projects/marketingagent.jpg',
    repoUrl: 'https://github.com/Manuele-T/AI_Marketing_Agent'
  },
  {
    id: 'local-mcp-file-analysis',
    title: 'Local MCP File Analysis',
    description: 'Model Context Protocol server for secure local file system analysis.',
    tech: ['TypeScript', 'MCP', 'Node.js'],
    screenshot: '/projects/mcpfileanalysis.jpg',
    repoUrl: 'https://github.com/Manuele-T/Local-MCP-File-Analysis-Server'
  },
  {
    id: 'n8n-ai-news',
    title: 'N8N AI News',
    description: 'Automated news aggregation and summarization workflow built with n8n.',
    tech: ['n8n', 'AI', 'Webhooks'],
    screenshot: '/projects/n8nainews.jpg',
    repoUrl: 'https://github.com/Manuele-T/N8N_AI_News'
  },
  {
    id: 'recipes-chatbot',
    title: 'Recipes Chatbot',
    description: 'Interactive AI chatbot for recipe discovery and cooking assistance.',
    tech: ['React', 'OpenAI', 'Tailwind'],
    screenshot: '/projects/recipeschatbot.jpg',
    repoUrl: 'https://github.com/Manuele-T/Recipes_Chatbot'
  }
];