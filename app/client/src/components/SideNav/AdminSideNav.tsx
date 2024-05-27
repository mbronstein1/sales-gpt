import { useMemo } from 'react';
import { getProfile } from '../../util/auth.util';
import { useDispatch, useSelector } from '../../store';
import { Button, Stack, Typography /*useTheme*/ } from '@mui/material';
import { useContentContext } from '../../hooks/use-content-context';
import VerticalTabs from '../Mui/VerticalTabs';
import { logout } from '../../slices/auth';
import { useRouter } from '../../hooks/use-router';
// import { RouterLink } from '../Mui/RouterLink';
import { paths } from '../../paths';

const AdminSideNav = () => {
  const { setSelectedContentIndex, selectedContentIndex, content } = useContentContext();
  const { authToken } = useSelector((state) => state.auth);
  const user = useMemo(() => getProfile(authToken), [authToken]);
  const dispatch = useDispatch();
  const router = useRouter();
  //   const theme = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    router.push(paths.login);
  };

  return (
    <Stack py={2} height="100%">
      <Typography variant="h6" textAlign="center">
        Welcome back {user.first_name}!
      </Typography>
      <VerticalTabs
        content={content}
        selectedContentIndex={selectedContentIndex}
        setSelectedContentIndex={setSelectedContentIndex}
      />
      {/* <Button
        component={RouterLink}
        href={paths.users}
        sx={{
          backgroundColor: router.location.pathname.includes('users')
            ? theme.palette.primary.main
            : '',
          color: router.location.pathname.includes('users') ? 'white' : '',
        }}
      >
        User Management
      </Button> */}
      <Button onClick={handleLogout}>Logout</Button>
    </Stack>
  );
};

export default AdminSideNav;
