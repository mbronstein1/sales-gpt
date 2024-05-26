import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  authToken: string;
}

const initialState: AuthState = {
  authToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.authToken = action.payload;
    },
    logout(state) {
      state.authToken = '';
    },
  },
});

export const { login, logout } = authSlice.actions;


export default authSlice.reducer;