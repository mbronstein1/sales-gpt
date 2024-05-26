export interface Prompt {
  title: string;
  prompt: string;
  gridCoordinates: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  color: string;
}

export interface FullPrompt {
  company: string;
  category: string;
  data: Prompt[];
}

export interface FullResponse {
  title: string;
  content: string | string[];
}

export interface FollowUpPrompt {
  company: string;
  category: string;
  data: string;
}
