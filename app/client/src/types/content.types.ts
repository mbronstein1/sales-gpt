export interface IReadContent {
  id?: string;
  category: string;
  data: ContentData[];
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

export interface GetAllContentArgs {
  companyId: string;
}

export interface GetContentByIdArgs extends GetAllContentArgs {
  contentId: string;
}

export interface CreateContentArgs extends GetAllContentArgs {
  data: ICreateContent;
}

export interface UpdateContentArgs extends GetContentByIdArgs {
  data: ICreateContent;
}
