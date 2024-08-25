import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: JSON.parse(localStorage.getItem('urls')) || [],
};

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    addUrl: (state, action) => {
      state.urls.push(action.payload);
      localStorage.setItem('urls', JSON.stringify(state.urls));
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter((url) => url.id !== action.payload);
      localStorage.setItem('urls', JSON.stringify(state.urls));
    },
    updateUrl: (state, action) => {
      const index = state.urls.findIndex((url) => url.id === action.payload.id);
      if (index !== -1) {
        state.urls[index] = action.payload;
        localStorage.setItem('urls', JSON.stringify(state.urls));
      }
    },
  },
});

export const { addUrl, deleteUrl, updateUrl } = urlSlice.actions;
export default urlSlice.reducer;
