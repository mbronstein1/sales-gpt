import { useMemo, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useContentContext } from '../../hooks/use-content-context';
import { useRouter } from '../../hooks/use-router';
import { paths } from '../../paths';
import { logout } from '../../slices/auth';
import { useDispatch } from '../../store';
import { Button, FormControl, MenuItem, Stack, TextField, Typography } from '@mui/material';
import useHttp from '../../hooks/use-http';
import { generateGptResponse } from '../../services/gpt.services';
import toast from 'react-hot-toast';

interface MainSideNavProps {
  setOpenOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainSideNav = ({ setOpenOverlay }: MainSideNavProps) => {
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [companyInput, setCompanyInput] = useState<string>('');

  const { content, setGptResponse } = useContentContext();
  const { profile: user } = useAuth();

  const { isLoading, fetchData: generateGptResponseRequest } = useHttp(generateGptResponse);

  const dispatch = useDispatch();
  const router = useRouter();

  const categories = useMemo(() => {
    return content.map((c) => ({ value: c.id, label: c.category }));
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedContentId || !companyInput)
      return toast.error('Please select a category and enter a company name');

    setOpenOverlay(true);
    const selectedContent = content.find((c) => c.id === selectedContentId);
    if (!selectedContent) return;

    const data = {
      company: companyInput,
      category: selectedContent.category,
      data: selectedContent.data,
    };

    const response = await generateGptResponseRequest(selectedContentId, data);

    setOpenOverlay(false);

    if (!response) return;
    setGptResponse(response.data);
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
      <FormControl component="form" sx={{ m: 2 }} onSubmit={handleSubmit}>
        <TextField
          select
          size="small"
          label="Select Category"
          value={selectedContentId}
          onChange={(e) => setSelectedContentId(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value} sx={{ py: 0 }}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          sx={{ mt: 2 }}
          helperText="Enter a company name"
          onChange={(e) => setCompanyInput(e.target.value)}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={isLoading}>
          Submit
        </Button>
      </FormControl>
      <Button onClick={handleLogout} sx={{ mt: 'auto' }}>
        Logout
      </Button>
    </Stack>
  );
};

export default MainSideNav;
