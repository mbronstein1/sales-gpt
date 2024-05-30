import { AxiosRequestConfig } from 'axios';
import { useSelector, RootState } from '../store';
import { getProfile } from '../util/auth.util';
import { useMemo } from 'react';

export const useAuth = () => {
  const { authToken } = useSelector((state: RootState) => state.auth);

  const profile = useMemo(() => getProfile(authToken), [authToken]);

  const config: AxiosRequestConfig | object = authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : {};

  return { config, profile };
};
