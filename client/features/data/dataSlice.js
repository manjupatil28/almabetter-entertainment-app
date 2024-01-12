import { createSlice } from '@reduxjs/toolkit'

import library from './data.json'

const initialState = {
  data: library,
  searchTerm: '',
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    searchShows: (state, action) => {
      return {
        ...state,
        data: library.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      }
    },
  },
})

export const { reset, setTerm, searchShows } = dataSlice.actions
export default dataSlice.reducer
