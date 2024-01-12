import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { authReset, signUp } from '../features/auth/authSlice'
import { getBookmarks } from '../features/bookmark/bookmarkSlice'

import Logo from '../assets/logo.svg'

function Signup() {
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
    password2: '',
  })

  const { email, password, password2 } = formData

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(getBookmarks())
      navigate('/')
    }

    return () => {
      dispatch(authReset())
    }
  }, [user, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = () => {
    if (password !== password2) {
      console.log('Passwords do not match!')
    } else {
      const userData = {
        email,
        password,
      }

      dispatch(signUp(userData))
    }
  }

  return (
    <div className='account__wrapper'>
      <div className='account'>
        <Logo />
        <div className='account__form'>
          <h1>Sign Up</h1>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className='input input__account'
                placeholder='Email address'
                type='email'
                {...register('email', {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                value={email}
                onChange={onChange}
              />
              <label className='input__account__error-label'>
                {errors.email && <p>Please enter a valid email</p>}
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
            <div>
              <input
                className='input input__account'
                placeholder='Repeat Password'
                type='password'
                {...register('password2', { required: true })}
                value={password2}
                onChange={onChange}
              />
              <label className='input__account__error-label'>
                {errors.password2 && <p>Can't be empty</p>}
              </label>
            </div>

            <button className='btn btn__account' type='submit'>
              Create an account
            </button>
          </form>
          <div className='account__footer'>
            <p>
              Already have an account? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
