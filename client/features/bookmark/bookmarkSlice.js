import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookmarkService from './bookmarkService'

const initialState = {
  bookmarks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create New Bookmark
export const createBookmark = createAsyncThunk(
  'bookmarks/create',
  async (bookmarkData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bookmarkService.createBookmark(bookmarkData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get User Bookmarks
export const getBookmarks = createAsyncThunk(
  'bookmarks/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bookmarkService.getBookmarks(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete User Bookmark
export const deleteBookmark = createAsyncThunk(
  'bookmarks/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bookmarkService.deleteBookmark(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    bookmarkReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBookmark.pending, (state) => {
        state.isBookmarksLoading = true
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookmarks.push(action.payload)
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookmarks = action.payload
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBookmark.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.bookmarks = state.bookmarks.filter(
          (fav) => fav._id !== action.payload.id
        )
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { bookmarkReset } = bookmarkSlice.actions
export default bookmarkSlice.reducer
