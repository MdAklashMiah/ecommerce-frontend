import { configureStore } from '@reduxjs/toolkit'
import userInfo from './slices/userSlice'
import { apiSlice } from './slices/apiSlice'

export const store = configureStore({
  reducer: {
    userInfo,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})