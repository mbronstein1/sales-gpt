import { IReadCompany } from './company.types';

export interface IReadContent {
  id: string;
  category: string;
  data: ContentData;
  companies: IReadCompany[];
  isShared: boolean;
}

export interface ContentData {
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

export interface ICreateContent {
  category: string;
  data: ContentData;
}
