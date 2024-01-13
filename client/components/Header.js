import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../features/auth/authSlice';

import Logo from '../assets/logo.svg';
import Home from '../assets/icon-nav-home.svg';
import Movies from '../assets/icon-nav-movies.svg';
import Tv from '../assets/icon-nav-tv-series.svg';
import Bookmark from '../assets/icon-nav-bookmark.svg';
import { avatar } from '../assets';

// Header Component
function Header() {
  // Redux hooks for dispatching actions and accessing user information
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Logout function to dispatch logout action and navigate to home
  const onClick = () => {
    dispatch(logout());
    navigate('/');
  };

  // JSX structure for rendering Header component
  return (
    <header className='header'>
      {/* Application logo */}
      <Logo />

      {/* Navigation links */}
      <nav>
        <Link to='/' aria-label='Home'>
          <Home />
        </Link>
        <Link to='/movies' aria-label='Movies'>
          <Movies />
        </Link>
        <Link to='/tv' aria-label='Tv'>
          <Tv />
        </Link>
        <Link to='/bookmarks' aria-label='Bookmarks'>
          <Bookmark />
        </Link>
      </nav>

      {/* User section - Display different content based on user authentication */}
      {user && (
        <div className='header__user'>
          {/* Logout button for authenticated users */}
          <button className='btn' title='User' onClick={onClick}>
            <img src={avatar} alt='User' />
          </button>

          {/* User information and logout option */}
          <div className='header__user__tag'>
            <p>{user.email.split('@')[0]}</p>
            <p>Logout</p>
          </div>
        </div>
      )}

      {!user && (
        <div className='header__user'>
          {/* Link to login page for non-authenticated users */}
          <Link to='/login' aria-label='Login'>
            <img src={avatar} alt='User' />
          </Link>

          {/* Login prompt for non-authenticated users */}
          <div className='header__user__tag'>
            <p>Login</p>
          </div>
        </div>
      )}
    </header>
  );
}

// Export the Header component
export default Header;
