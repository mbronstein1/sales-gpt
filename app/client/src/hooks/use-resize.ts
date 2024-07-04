import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useResize = () => {
  const [width, setWidth] = useState(1200); // Initial width
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    // Handle changes to the ref
    if (containerRef.current) {
      handleResize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  return { width, containerRef };
};

export default useResize;
