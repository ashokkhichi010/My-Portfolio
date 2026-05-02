export interface HomeData {
  title: string;
  subtitle: string;
  description: string;
  roles: string[];
  cta: {
    text: string;
    link: string;
  };
}

export interface AboutData {
  title: string;
  story: string[];
  image?: string;
  highlights: string[];
}

export interface JourneyItem {
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'achievement' | 'transition' | 'learning' | 'growth' | 'decision' | 'insight' | 'launch' | 'experience' | 'pause' | 'current';
}

export interface JourneyData {
  title: string;
  timeline: JourneyItem[];
}

export interface Skill {
  name: string;
  level: number;
  // category: string;
}

export interface SkillsData {
  title: string;
  categories: {
    [key: string]: Skill[];
  };
}

export interface Project {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  tags: string[];
  summary?: string;
  status?: 'completed' | 'in progress' | 'on hold' | 'concept';
  link?: string;
  github?: string;
  image?: string;
  preview?: 'website' | 'image';
  previewUrl?: string;
}

export interface ProjectsData {
  title: string;
  projects: Project[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface ExperienceData {
  title: string;
  experiences: ExperienceItem[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  achievements?: string[];
}

export interface EducationData {
  title: string;
  education: EducationItem[];
}

export interface Achievement {
  title: string;
  timeframe: string;
  context?: string;
  description: string;
  category: string;
  highlights?: string[];
}

export interface AchievementsData {
  title: string;
  achievements: Achievement[];
}

export interface Tool {
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export interface ToolsData {
  title: string;
  tools: Tool[];
}

export interface VisionData {
  title: string;
  vision: string;
  goals: {
    shortTerm: string[];
    longTerm: string[];
  };
  values: string[];
}

export interface ContactData {
  title: string;
  description: string;
  email: string;
  social: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  gradient?: string;
}

export interface ChatState {
  sessionId: string | null;
  socketId: string | null;
  connectionStatus: 'idle' | 'connecting' | 'connected' | 'disconnected';
  isRehydrated: boolean;
  isRestored: boolean;
  connectedAt: string | null;
  messages: {
    id: string;
    role: 'visitor' | 'assistant' | 'admin';
    content: string;
    createdAt: string;
  }[];
  isAwaitingAi: boolean;
  isTyping: boolean;
  showHandoverButton: boolean;
  handoverStatus: 'AI' | 'HANDOVER_REQUESTED' | 'LIVE' | 'ADMIN_BUSY';
  handoverCountdownMs: number;
  handoverExpiresAt: string | null;
  adminAvailable: boolean;
  adminBusy: boolean;
  isRequestingHandover: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'ADMIN';
  displayName?: string;
}
