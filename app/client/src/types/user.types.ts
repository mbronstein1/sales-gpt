import { IReadCompany } from './company.types';

export interface IReadUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  companyId: string;
  company?: IReadCompany;
}

export interface ICreateUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  companyId: string;
}
