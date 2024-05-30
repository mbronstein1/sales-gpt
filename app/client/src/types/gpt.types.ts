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
  title: string;
  content: string | string[];
}

export interface FollowUpGPTPrompt {
  company: string;
  category: string;
  data: string;
}
