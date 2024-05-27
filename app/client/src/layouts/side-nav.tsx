import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useRouter } from '../hooks/use-router';
import { useMemo } from 'react';
import AdminSideNav from '../components/SideNav/AdminSideNav';

interface SideNavProps {
  SIDE_NAV_WIDTH: number;
}

const SideNav = ({ SIDE_NAV_WIDTH }: SideNavProps) => {
  const router = useRouter();
  const currentPath = useMemo(() => router.location.pathname, [router.location.pathname]);

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
      {currentPath.includes('admin') ? <AdminSideNav /> : <Typography>SideBar</Typography>}
    </Drawer>
  );
};

export default SideNav;
