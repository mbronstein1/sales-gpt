import { createContext } from 'react';
import { IReadContent } from '../../types/content.types';
import { IReadGPTResponse } from '../../types/gpt.types';

export interface ContentContextType {
  content: IReadContent[];
  setContent: React.Dispatch<React.SetStateAction<IReadContent[]>>;
  selectedContentIndex: number;
  setSelectedContentIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  newCategories: string[];
  setNewCategories: React.Dispatch<React.SetStateAction<string[]>>;
  gptResponse: IReadGPTResponse;
  setGptResponse: React.Dispatch<React.SetStateAction<IReadGPTResponse>>;
}

export const ContentContext = createContext<ContentContextType>({
  content: [],
  setContent: () => {},
  selectedContentIndex: 0,
  setSelectedContentIndex: () => {},
  isLoading: false,
  newCategories: [],
  setNewCategories: () => {},
  gptResponse: {} as IReadGPTResponse,
  setGptResponse: () => {},
});
