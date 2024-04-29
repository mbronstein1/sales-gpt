import * as yup from 'yup';

export const signupAdminSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});
