import { createContext } from 'react';
import { IReadContent } from '../../types/content.types';

export interface ContentContextType {
  content: IReadContent[];
  setContent: React.Dispatch<React.SetStateAction<IReadContent[]>>;
  selectedContentIndex: number;
  setSelectedContentIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

export const ContentContext = createContext<ContentContextType>({
  content: [],
  setContent: () => {},
  selectedContentIndex: 0,
  setSelectedContentIndex: () => {},
  isLoading: false,
});
