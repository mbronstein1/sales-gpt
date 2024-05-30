import { useState } from 'react';
import { useDispatch } from '../../store';
import {
  Button,
  FormControl,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  Typography /*useTheme*/,
} from '@mui/material';
import { useContentContext } from '../../hooks/use-content-context';
import VerticalTabs from '../Mui/VerticalTabs';
import { logout } from '../../slices/auth';
import { useRouter } from '../../hooks/use-router';
// import { RouterLink } from '../Mui/RouterLink';
import { paths } from '../../paths';
import { useAuth } from '../../hooks/use-auth';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const AdminSideNav = () => {
  const [newCategory, setNewCategory] = useState('');
  const [addNewCategory, setAddNewCategory] = useState(false);

  const { setSelectedContentIndex, selectedContentIndex, content, setContent, setNewCategories } =
    useContentContext();
  const { profile: user } = useAuth();

  const dispatch = useDispatch();
  const router = useRouter();
  //   const theme = useTheme();

  const handleAddNewCategory = () => {
    setContent((prev) => {
      return [
        ...prev,
        {
          category: newCategory,
          data: [],
          isShared: false,
        },
      ];
    });

    setNewCategories((prev) => [...prev, newCategory]);
    setNewCategory('');
    setAddNewCategory(false);
  };

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
      {addNewCategory && (
        <FormControl component="form" sx={{ m: 2 }} onSubmit={handleAddNewCategory}>
          <TextField
            size="small"
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button sx={{ width: 10, mt: 1, mx: 'auto' }} variant="contained" type="submit">
            Add
          </Button>
        </FormControl>
      )}
      <IconButton
        onClick={() => setAddNewCategory(true)}
        sx={{ mx: 'auto' }}
        // sx={{
        //   '&.MuiButtonBase-root:hover': {
        //     bgcolor: 'transparent',
        //   },
        // }}
      >
        <SvgIcon>
          <AddBoxOutlinedIcon />
        </SvgIcon>
      </IconButton>
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
      <Button onClick={handleLogout} sx={{ mt: 'auto' }}>
        Logout
      </Button>
    </Stack>
  );
};

export default AdminSideNav;
