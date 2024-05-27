import { IReadContent } from './content.types';
import { IReadUser } from './user.types';

export interface IReadCompany {
  id: string;
  name: string;
  content?: IReadContent[];
  followupQs: string[];
  users: IReadUser[];
}

export interface ICreateCompany {
  name: string;
}
