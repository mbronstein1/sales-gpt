/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './use-auth';

const useHttp = (customRequest: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { config } = useAuth();

  const fetchData = useCallback(
    async (...args: any[]) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setIsLoading(true);

      try {
        const responseData = await customRequest(...args, config, abortController.signal);
        return responseData;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          abortControllerRef.current = null;
          return;
        }

        if (error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error('Something went wrong. Unable to fetch data.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [customRequest, config]
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { isLoading, fetchData };
};

export default useHttp;
