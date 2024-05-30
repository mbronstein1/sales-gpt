import { Box, Stack, Typography } from '@mui/material';
import LoadingSpinner from '../components/Mui/LoadingSpinner';

const LoadingOverlay = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    >
      <Stack gap={2}>
        <LoadingSpinner />
        <Typography variant="subtitle2" color="white" sx={{ position: 'relative' }}>
          {text}
          <span className="ellipses"></span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoadingOverlay;
