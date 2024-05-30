import type { FC, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RootState, useSelector } from '../store';
import { useRouter } from '../hooks/use-router';
import { paths } from '../paths';
import toast from 'react-hot-toast';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { authToken } = useSelector((state: RootState) => state.auth);
  const [checked, setChecked] = useState<boolean>(false);

  const check = useCallback(() => {
    if (window.location.pathname.includes(paths.login) && authToken) {
      router.replace(paths.index);
    }

    if (!authToken && !window.location.pathname.includes(paths.login)) {
      const href = paths.login;
      toast.error('Not authenticated, please login.');
      router.replace(href);
    }

    setChecked(true);
  }, [authToken, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
