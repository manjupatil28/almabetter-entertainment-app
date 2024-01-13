import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { validate } from './features/auth/authSlice';
import { getBookmarks, bookmarkReset } from './features/bookmark/bookmarkSlice';

import Layout from './components/Layout';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import FilteredShows from './components/FilteredShows'; 
import BookmarkedShows from './components/BookmarkedShows';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';

const App = () => {
  const dispatch = useDispatch();

  // Select relevant data from the Redux store
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Validate user on component mount
    dispatch(validate(user));

    if (isAuthenticated) {
      // Fetch bookmarks if the user is authenticated
      dispatch(getBookmarks());
    } else {
      // Reset bookmarks if the user is not authenticated
      dispatch(bookmarkReset());
    }
  }, [user, isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<SearchResults />} />
            {/* Route for Movies */}
            <Route
              path='/movies'
              element={
                <FilteredShows filterType={'Movie'} pageTitle={'Movies'} />
              }
            />
            {/* Route for TV Series */}
            <Route
              path='/tv'
              element={
                <FilteredShows filterType={'TV Series'} pageTitle={'Tv'} />
              }
            />
            {/* Route for Bookmarked Shows */}
            <Route path='/bookmarks' element={<BookmarkedShows />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* Route for Page Not Found */}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

// Enable Hot Module Replacement (HMR) for faster development feedback
export default hot(App);
