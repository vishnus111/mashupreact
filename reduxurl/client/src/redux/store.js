import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './userSlice';
import urlReducer from './urlSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    url: urlReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
