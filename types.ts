
export interface Employer {
  id: string;
  name: string;
  logoUrl?: string;
  rating: number;
}

export interface Job {
  id: string;
  title: string;
  employer: Employer;
  location: string;
  category: string;
  description: string;
  hourlyRate: number;
  isUrgent: boolean;
  tags: string[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
