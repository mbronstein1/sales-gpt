export interface ICreateGPTPrompt {
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

export interface ICreateFullGPTPrompt {
  company: string;
  category: string;
  data: ICreateGPTPrompt[];
}

export interface IReadGPTResponse {
  company: string;
  category: string;
  data: IReadGptData[];
}

export interface IReadGptData {
  color: string;
  content: string | string[];
  gridCoordinates: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  title: string;
}

export interface FollowUpGPTPrompt {
  company: string;
  category: string;
  data: string;
}
