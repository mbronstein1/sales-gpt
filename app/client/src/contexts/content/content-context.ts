import { createContext } from 'react';
import { IReadContent } from '../../types/content.types';

export interface ContentContextType {
  content: IReadContent[];
  selectedContentIndex: number;
  setSelectedContentIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

export const ContentContext = createContext<ContentContextType>({
  content: [],
  selectedContentIndex: 0,
  setSelectedContentIndex: () => {},
  isLoading: false,
});
