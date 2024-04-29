export type TableName = 'user' | 'company';

export type IReadUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  isAdmin: boolean;
  company: IReadCompany;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IReadCompany = {
  id: number;
  name: string;
  content?: Content[];
  followupQs: string[];
  users?: IReadUser[];
  createdAt: Date;
  updatedAt: Date;
};

export type Content = {
  category: string;
  data: {
    title: string;
    prompt: string;
    gridCoordinates: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
    color: string;
  };
};

export type CreateUser = Omit<IReadUser, 'id' | 'createdAt' | 'updatedAt' | 'company'>;
export type CreateCompany = Omit<
  IReadCompany,
  'id' | 'createdAt' | 'updatedAt' | 'content' | 'followupQs' | 'users'
>;
