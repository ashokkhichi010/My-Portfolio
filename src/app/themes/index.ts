import type { Theme } from '../types';

export const themes: Record<string, Theme> = {
  home: {
    name: 'Cosmic Core',
    colors: {
      primary: '#72e6ff',
      secondary: '#7b7dff',
      accent: '#c592ff',
      background: '#050816',
      text: '#eff7ff',
    },
    gradient: 'linear-gradient(135deg, #72e6ff 0%, #7b7dff 52%, #c592ff 100%)',
  },

  about: {
    name: 'AI System',
    colors: {
      primary: '#7df7d4',
      secondary: '#4ed9ff',
      accent: '#9bf6cf',
      background: '#07111d',
      text: '#e8fff7',
    },
    gradient: 'linear-gradient(135deg, #7df7d4 0%, #4ed9ff 100%)',
  },

  journey: {
    name: 'Timeline Physics',
    colors: {
      primary: '#ff9e73',
      secondary: '#ff78a2',
      accent: '#ffd787',
      background: '#0a0918',
      text: '#fff5ef',
    },
    gradient: 'linear-gradient(135deg, #ff9e73 0%, #ff78a2 55%, #ffd787 100%)',
  },

  skills: {
    name: 'Math Grid',
    colors: {
      primary: '#9e9dff',
      secondary: '#6ccfff',
      accent: '#d2c4ff',
      background: '#070a19',
      text: '#f2f3ff',
    },
    gradient: 'linear-gradient(135deg, #9e9dff 0%, #6ccfff 100%)',
  },

  projects: {
    name: 'Mission Control',
    colors: {
      primary: '#69e6f2',
      secondary: '#5d9cff',
      accent: '#a8ffff',
      background: '#060b17',
      text: '#edfbff',
    },
    gradient: 'linear-gradient(135deg, #69e6f2 0%, #5d9cff 100%)',
  },

  experience: {
    name: 'Memory System',
    colors: {
      primary: '#7bc4ff',
      secondary: '#9b8eff',
      accent: '#c4e5ff',
      background: '#06091a',
      text: '#eef4ff',
    },
    gradient: 'linear-gradient(135deg, #7bc4ff 0%, #9b8eff 100%)',
  },

  education: {
    name: 'Knowledge Log',
    colors: {
      primary: '#ffd36e',
      secondary: '#80c8ff',
      accent: '#fff0b4',
      background: '#090c18',
      text: '#fff9ef',
    },
    gradient: 'linear-gradient(135deg, #ffd36e 0%, #80c8ff 100%)',
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
    name: 'Vision Module',
    colors: {
      primary: '#8ca5ff',
      secondary: '#c592ff',
      accent: '#d7deff',
      background: '#070919',
      text: '#eef2ff',
    },
    gradient: 'linear-gradient(135deg, #8ca5ff 0%, #c592ff 100%)',
  },

  contact: {
    name: 'Signal Transmission',
    colors: {
      primary: '#7effc3',
      secondary: '#5edcff',
      accent: '#b8ffe1',
      background: '#06101a',
      text: '#edfff7',
    },
    gradient: 'linear-gradient(135deg, #7effc3 0%, #5edcff 100%)',
  },
};
