import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import { validate } from './features/auth/authSlice'
import { getBookmarks, bookmarkReset } from './features/bookmark/bookmarkSlice'

import Layout from './components/Layout'
import Home from './components/Home'
import SearchResults from './components/SearchResults'
import FilterdShows from './components/FilteredShows'
import BookmarkedShows from './components/BookmarkedShows'
import Login from './components/Login'
import Signup from './components/Signup'
import PageNotFound from './components/PageNotFound'

const App = () => {
  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(validate(user))
    if (isAuthenticated) {
      dispatch(getBookmarks())
    } else {
      dispatch(bookmarkReset())
    }
  }, [user, isAuthenticated])

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchResults />} />
            <Route
              path='/movies'
              element={
                <FilterdShows filterType={'Movie'} pageTitle={'Movies'} />
              }
            />
            <Route
              path='/tv'
              element={
                <FilterdShows filterType={'TV Series'} pageTitle={'Tv'} />
              }
            />
            <Route path='/bookmarks' element={<BookmarkedShows />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default hot(App)
