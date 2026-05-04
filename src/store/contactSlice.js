import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { sendContactMessage } from '../services/api'

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await sendContactMessage(formData)
      return result
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }
)

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle', // idle | loading | success | error
    error: null,
  },
  reducers: {
    resetContact: (state) => { state.status = 'idle'; state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(submitContact.fulfilled, (state) => { state.status = 'success' })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
  },
})

export const { resetContact } = contactSlice.actions
export default contactSlice.reducer
