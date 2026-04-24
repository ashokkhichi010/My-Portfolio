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
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  about: {
    name: 'Ocean',
    colors: {
      primary: '#06b6d4',
      secondary: '#0ea5e9',
      accent: '#22d3ee',
      background: '#0c4a6e',
      text: '#f0f9ff',
    },
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  journey: {
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fbbf24',
      background: '#7c2d12',
      text: '#fff7ed',
    },
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  skills: {
    name: 'Forest',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      background: '#064e3b',
      text: '#f0fdf4',
    },
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  projects: {
    name: 'Violet',
    colors: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      accent: '#c084fc',
      background: '#4c1d95',
      text: '#faf5ff',
    },
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  experience: {
    name: 'Slate',
    colors: {
      primary: '#64748b',
      secondary: '#94a3b8',
      accent: '#cbd5e1',
      background: '#1e293b',
      text: '#f8fafc',
    },
    gradient: 'linear-gradient(135deg, #485563 0%, #29323c 100%)',
  },
  education: {
    name: 'Amber',
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#fcd34d',
      background: '#78350f',
      text: '#fffbeb',
    },
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  achievements: {
    name: 'Rose',
    colors: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      accent: '#fda4af',
      background: '#881337',
      text: '#fff1f2',
    },
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  tools: {
    name: 'Teal',
    colors: {
      primary: '#14b8a6',
      secondary: '#2dd4bf',
      accent: '#5eead4',
      background: '#134e4a',
      text: '#f0fdfa',
    },
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  vision: {
    name: 'Indigo',
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8',
      accent: '#a5b4fc',
      background: '#312e81',
      text: '#eef2ff',
    },
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  contact: {
    name: 'Emerald',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#6ee7b7',
      background: '#065f46',
      text: '#f0fdf4',
    },
    gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
  },
};
