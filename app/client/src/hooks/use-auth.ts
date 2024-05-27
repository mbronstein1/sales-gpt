import { AxiosRequestConfig } from 'axios';
import { useSelector, RootState } from '../store';

export const useAuth = () => {
  const { authToken } = useSelector((state: RootState) => state.auth);

  const config: AxiosRequestConfig | object = authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : {};

  return { config };
};
