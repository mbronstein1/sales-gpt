import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback } from 'react';

interface TabDataProps {
  content: {
    id: string;
    category: string;
  }[];
  selectedContentIndex: number;
  setSelectedContentIndex: React.Dispatch<React.SetStateAction<number>>;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({
  content,
  selectedContentIndex,
  setSelectedContentIndex,
}: TabDataProps) {
  const handleChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setSelectedContentIndex(newValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: 224,
        overflowY: 'auto',
        my: 2,
      }}
    >
      <Tabs
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={selectedContentIndex}
        onChange={handleChange}
        aria-label="Admin Content Tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        TabIndicatorProps={{
          style: { transition: 'none' },
        }}
      >
        {content.map((tab, index) => (
          <Tab
            disableRipple
            key={tab.id}
            label={tab.category}
            {...a11yProps(index)}
            value={index}
            sx={{ p: 0 }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
