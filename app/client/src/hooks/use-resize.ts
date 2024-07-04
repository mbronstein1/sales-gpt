import { useEffect, useRef, useState } from 'react';

const useResize = () => {
  const [width, setWidth] = useState(1200); // Initial width
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, containerRef };
};

export default useResize;
