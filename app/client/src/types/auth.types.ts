export interface LoginData {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
