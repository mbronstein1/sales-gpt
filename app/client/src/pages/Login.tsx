import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { RouterLink } from '../components/Mui/RouterLink';
import { useCallback, useState } from 'react';
import { LoginData } from '../types/auth.types';
import useHttp from '../hooks/use-http';
import { login as loginService } from '../services/auth.services';
import { useDispatch } from '../store';
import { login } from '../slices/auth';
import { useRouter } from '../hooks/use-router';
import { paths } from '../paths';
import toast from 'react-hot-toast';
import { withAuthGuard } from '../hocs/with-auth-guard';

const Login = withAuthGuard(() => {
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '', isAdmin: false });

  const router = useRouter();
  const dispatch = useDispatch();
  const { fetchData: loginUser, isLoading } = useHttp(loginService);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCheck = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      isAdmin: !prev.isAdmin,
    }));
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formData.email || !formData.password) return toast.error('Please fill in all fields');
      if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return toast.error('Please enter a valid email address');
      }

      const response = await loginUser(formData);

      if (response) {
        dispatch(login(response.data));
        router.push(formData.isAdmin ? paths.adminDash : paths.index);
      }
    },
    [formData, loginUser, dispatch, router]
  );

  return (
    <Stack
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        maxWidth: '600px',
        textAlign: 'center',
        maxHeight: '95%',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        padding: 4,
      }}
    >
      <Typography variant="h1" fontSize={34}>
        Login
      </Typography>
      <FormControl component="form" onSubmit={handleLogin}>
        <TextField
          id="email"
          label="Email"
          margin="normal"
          name="email"
          required
          variant="outlined"
          size="small"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          id="password"
          label="Password"
          margin="normal"
          name="password"
          required
          type="password"
          variant="outlined"
          size="small"
          value={formData.password}
          onChange={handleChange}
        />
        <Stack my={2}>
          <Button variant="contained" size="large" type="submit" disabled={isLoading}>
            Login
          </Button>
        </Stack>
      </FormControl>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography>Don't have an account?</Typography>
          <Link component={RouterLink} href="/register">
            Register
          </Link>
        </Stack>
        <FormControlLabel
          control={<Checkbox size="small" checked={formData.isAdmin} onChange={handleCheck} />}
          label="Admin Dashboard"
        />
      </Stack>
    </Stack>
  );
});

export default Login;
