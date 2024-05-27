import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';

const SIDE_NAV_WIDTH = 280;

export const SideNav = () => {
  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          width: SIDE_NAV_WIDTH,
        },
      }}
      variant="permanent"
    >
      <Typography>SideBar</Typography>
    </Drawer>
  );
};
