import { jwtDecode } from 'jwt-decode';
import { IReadUser } from '../types/user.types';

export const getProfile = (token: string) => {
  const { data } = jwtDecode(token);
  return data as IReadUser;
};
