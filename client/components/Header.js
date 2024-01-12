import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../features/auth/authSlice'

import Logo from '../assets/logo.svg'
import Home from '../assets/icon-nav-home.svg'
import Movies from '../assets/icon-nav-movies.svg'
import Tv from '../assets/icon-nav-tv-series.svg'
import Bookmark from '../assets/icon-nav-bookmark.svg'
import { avatar } from '../assets'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const onClick = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className='header'>
      <Logo />
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
      {user && (
        <div className='header__user'>
          <button className='btn' title='User' onClick={onClick}>
            <img src={avatar} alt='User' />
          </button>
          <div className='header__user__tag'>
            <p>{user.email.split('@')[0]}</p>
            <p>Logout</p>
          </div>
        </div>
      )}
      {!user && (
        <div className='header__user'>
          <Link to='/login' aria-label='Login'>
            <img src={avatar} alt='User' />
          </Link>
          <div className='header__user__tag'>
            <p>Login</p>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
