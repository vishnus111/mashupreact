import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  urls: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addUrl: (state, action) => {
      if (state.urls.length < 5) {
        state.urls.push(action.payload);
      } else {
        alert('You can only add up to 5 URLs.');
      }
    },
    updateUrl: (state, action) => {
      const { id, title, originalUrl } = action.payload;
      const existingUrl = state.urls.find((url) => url._id === id);
      if (existingUrl) {
        existingUrl.title = title;
        existingUrl.originalUrl = originalUrl;
      }
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter((url) => url._id !== action.payload);
    },
    setUrls: (state, action) => {
      state.urls = action.payload;
    },
    searchUrl: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  addUrl,
  updateUrl,
  deleteUrl,
  setUrls,
  searchUrl,
} = urlSlice.actions;

export const fetchUrls = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('/api/urls', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUrls(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSearchUrls = (searchTerm) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`/api/urls/search?searchTerm=${searchTerm}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(setUrls(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createUrl = (urlData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post('/api/urls', urlData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(addUrl(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editUrl = (id, urlData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.put(`/api/urls/${id}`, urlData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(updateUrl(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeUrl = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`/api/urls/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    dispatch(deleteUrl(id));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default urlSlice.reducer;
