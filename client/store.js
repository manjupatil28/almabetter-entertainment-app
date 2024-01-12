import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// Import Reducers
import authReducer from './features/auth/authSlice'
import dataReducer from './features/data/dataSlice'
import bookmarkReducer from './features/bookmark/bookmarkSlice'

// Combine Reducers
const reducers = combineReducers({
  data: dataReducer,
  auth: authReducer,
  bookmarks: bookmarkReducer,
})

// Configure Store
const store = configureStore({
  reducer: reducers,
})

export default store
