import type { Theme } from '../types';

export const themes: Record<string, Theme> = {
  home: {
    name: 'Cosmic',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0f172a',
      text: '#f8fafc',
    },
    gradient: 'linear-gradient(135deg, #6366f1, #ec4899)',
  },

  about: {
    name: 'Ocean',
    colors: {
      primary: '#06b6d4',
      secondary: '#0ea5e9',
      accent: '#22d3ee',
      background: '#082f49',
      text: '#e0f2fe',
    },
    gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
  },

  journey: {
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fbbf24',
      background: '#431407',
      text: '#fff7ed',
    },
    gradient: 'linear-gradient(135deg, #f97316, #fbbf24)',
  },

  skills: {
    name: 'Forest',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      background: '#022c22',
      text: '#ecfdf5',
    },
    gradient: 'linear-gradient(135deg, #10b981, #6ee7b7)',
  },

  projects: {
    name: 'Violet',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c084fc',
      background: '#2e1065',
      text: '#faf5ff',
    },
    gradient: 'linear-gradient(135deg, #8b5cf6, #c084fc)',
  },

  experience: {
    name: 'Slate',
    colors: {
      primary: '#64748b',
      secondary: '#94a3b8',
      accent: '#cbd5e1',
      background: '#020617',
      text: '#e2e8f0',
    },
    gradient: 'linear-gradient(135deg, #64748b, #cbd5e1)',
  },

  education: {
    name: 'Amber',
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#fde68a',
      background: '#451a03',
      text: '#fffbeb',
    },
    gradient: 'linear-gradient(135deg, #f59e0b, #fde68a)',
  },

  achievements: {
    name: 'Rose',
    colors: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      accent: '#fda4af',
      background: '#4c0519',
      text: '#fff1f2',
    },
    gradient: 'linear-gradient(135deg, #f43f5e, #fda4af)',
  },

  tools: {
    name: 'Teal',
    colors: {
      primary: '#14b8a6',
      secondary: '#2dd4bf',
      accent: '#5eead4',
      background: '#042f2e',
      text: '#ccfbf1',
    },
    gradient: 'linear-gradient(135deg, #14b8a6, #5eead4)',
  },

  vision: {
    name: 'Indigo',
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8',
      accent: '#a5b4fc',
      background: '#1e1b4b',
      text: '#eef2ff',
    },
    gradient: 'linear-gradient(135deg, #6366f1, #a5b4fc)',
  },

  contact: {
    name: 'Emerald',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      background: '#022c22',
      text: '#ecfdf5',
    },
    gradient: 'linear-gradient(135deg, #10b981, #6ee7b7)',
  },
};