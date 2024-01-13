import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkService from './bookmarkService';

// Initial state for the bookmarks slice
const initialState = {
  bookmarks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create New Bookmark
export const createBookmark = createAsyncThunk(
  'bookmarks/create',
  async (bookmarkData, thunkAPI) => {
    try {
      // Get the user token from the auth slice state
      const token = thunkAPI.getState().auth.user.token;
      // Call the bookmarkService to create a new bookmark
      return await bookmarkService.createBookmark(bookmarkData, token);
    } catch (error) {
      // Handle any errors that occur during the async operation
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the promise with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get User Bookmarks
export const getBookmarks = createAsyncThunk(
  'bookmarks/getAll',
  async (_, thunkAPI) => {
    try {
      // Get the user token from the auth slice state
      const token = thunkAPI.getState().auth.user.token;
      // Call the bookmarkService to get all user bookmarks
      return await bookmarkService.getBookmarks(token);
    } catch (error) {
      // Handle any errors that occur during the async operation
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the promise with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User Bookmark
export const deleteBookmark = createAsyncThunk(
  'bookmarks/delete',
  async (id, thunkAPI) => {
    try {
      // Get the user token from the auth slice state
      const token = thunkAPI.getState().auth.user.token;
      // Call the bookmarkService to delete a user bookmark
      return await bookmarkService.deleteBookmark(id, token);
    } catch (error) {
      // Handle any errors that occur during the async operation
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the promise with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create the bookmarks slice
export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    // Reset the bookmarks slice state to initial state
    bookmarkReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create Bookmark async actions
      .addCase(createBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Add the newly created bookmark to the state
        state.bookmarks.push(action.payload);
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get User Bookmarks async actions
      .addCase(getBookmarks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Set the user bookmarks in the state
        state.bookmarks = action.payload;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete User Bookmark async actions
      .addCase(deleteBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove the deleted bookmark from the state
        state.bookmarks = state.bookmarks.filter(
          (fav) => fav._id !== action.payload.id
        );
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export the bookmarks slice actions and reducer
export const { bookmarkReset } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
