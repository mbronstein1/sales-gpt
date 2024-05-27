import { useState, useEffect } from 'react';
import { useContentContext } from '../hooks/use-content-context';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box } from '@mui/system';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const AdminDash = () => {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');

  console.log('currentBreakpoint: ', currentBreakpoint);

  const { content, selectedContentIndex } = useContentContext();

  useEffect(() => {
    if (content.length === 0) return;

    const newLayout = content[selectedContentIndex].data.map((d, index) => ({
      i: index.toString(),
      ...d.gridCoordinates,
    }));

    setLayout(newLayout);
  }, [content, selectedContentIndex]);

  if (content.length === 0) return null;

  const handleLayoutChange = (layout: Layout[]) => {
    setLayout(layout);
    console.log(layout);
  };

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  return (
    <ResponsiveGridLayout
      layouts={{ lg: layout }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isDraggable
      isResizable
      measureBeforeMount
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={handleLayoutChange}
    >
      {content[selectedContentIndex].data.map((d, index) => (
        <Box sx={{ userSelect: 'none' }} key={index}>
          {d.prompt}
        </Box>
      ))}
    </ResponsiveGridLayout>
  );
};

export default AdminDash;
