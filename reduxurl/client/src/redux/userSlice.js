import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || '',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const { setLoading, setError, setUser, logout } = userSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('/api/auth/login', credentials);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const signup = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('/api/auth/signup', credentials);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default userSlice.reducer;
