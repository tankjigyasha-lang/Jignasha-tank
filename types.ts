
export interface Blueprint {
  title: string;
  description: string;
  architecture: string;
  frontendStack: string[];
  backendStack: string[];
  databaseSchema: {
    table: string;
    fields: string[];
  }[];
  keyFeatures: string[];
}

export type ViewMode = 'learn' | 'architect' | 'visualize';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
