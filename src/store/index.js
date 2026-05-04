import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import contactReducer from './contactSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contact: contactReducer,
  },
})
