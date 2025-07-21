import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isloggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCreds(state, action) {
      state.user = action.payload;
      state.isloggedIn = true;
    },
    clearUserCreds(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserCreds, clearUserCreds } = userSlice.actions;

export default userSlice.reducer;
