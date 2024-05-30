import Drawer from '@mui/material/Drawer';
import { useRouter } from '../hooks/use-router';
import { useMemo } from 'react';
import AdminSideNav from '../components/SideNav/AdminSideNav';
import MainSideNav from '../components/SideNav/MainSideNav';

interface SideNavProps {
  SIDE_NAV_WIDTH: number;
  setOpenOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav = ({ SIDE_NAV_WIDTH, setOpenOverlay }: SideNavProps) => {
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
      {currentPath.includes('admin') ? (
        <AdminSideNav />
      ) : (
        <MainSideNav setOpenOverlay={setOpenOverlay} />
      )}
    </Drawer>
  );
};

export default SideNav;
