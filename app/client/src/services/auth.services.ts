import { post } from '../helpers/api_helpers';
import { LoginData, SignupData } from '../types/auth.types';

export const login = async ({ email, password, isAdmin }: LoginData) => {
  const query = isAdmin ? `?admin=true` : '';
  return await post(`/auth${query}`, { email, password });
};

export const signup = async (data: SignupData, companyName: string) => {
  return await post(`/auth/signup/${companyName}`, data);
};
