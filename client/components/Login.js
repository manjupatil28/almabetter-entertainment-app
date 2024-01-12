import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { authReset, login } from '../features/auth/authSlice'
import { getBookmarks } from '../features/bookmark/bookmarkSlice'

import Logo from '../assets/logo.svg'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  useEffect(() => {
    console.log(formData)
    if (isSuccess && user) {
      dispatch(getBookmarks())
      navigate('/')
    }

    return () => {
      dispatch(authReset())
    }
  }, [user, isError, isSuccess, message, formData, navigate, dispatch])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div className='account__wrapper'>
      <div className='account'>
        <Logo />
        <div className='account__form'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className='input input__account'
                placeholder='Email address'
                type='email'
                {...register('email', { required: true })}
                value={email}
                onChange={onChange}
              />
              <label className='input__account__error-label'>
                {errors.email && <p>Can't be empty</p>}
              </label>
            </div>
            <div>
              <input
                className='input input__account'
                placeholder='Password'
                type='password'
                {...register('password', { required: true })}
                value={password}
                onChange={onChange}
              />
              <label className='input__account__error-label'>
                {errors.password && <p>Can't be empty</p>}
              </label>
            </div>
            <button className='btn btn__account' type='submit'>
              Login to your account
            </button>
          </form>
          <div className='account__footer'>
            <p>
              Don't have an account? <a href='/signup'>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
