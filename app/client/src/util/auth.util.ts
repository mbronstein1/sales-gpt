import { jwtDecode } from 'jwt-decode';

export const getProfile = (token: string) => {
  return jwtDecode(token);
};
