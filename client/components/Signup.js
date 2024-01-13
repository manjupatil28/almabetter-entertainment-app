import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { authReset, signUp } from '../features/auth/authSlice';
import { getBookmarks } from '../features/bookmark/bookmarkSlice';

import Logo from '../assets/logo.svg';

// Signup Component
function Signup() {
  // React hooks for navigation, dispatching actions, and managing form state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redux state for authentication information
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Local state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const { email, password, password2 } = formData;

  // useEffect to handle side effects based on authentication state changes
  useEffect(() => {
    // If signup is successful, retrieve bookmarks and navigate to the home page
    if (isSuccess && user) {
      dispatch(getBookmarks());
      navigate('/');
    }

    // Cleanup function to reset authentication state on component unmount
    return () => {
      dispatch(authReset());
    }
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  // Function to handle input changes
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Function to handle form submission
  const onSubmit = () => {
    // Check if the passwords match before dispatching the signup action
    if (password !== password2) {
      console.log('Passwords do not match!');
    } else {
      const userData = {
        email,
        password,
      };

      dispatch(signUp(userData));
    }
  }

  // JSX structure for rendering Signup component
  return (
    <div className='account__wrapper'>
      <div className='account'>
        {/* Application logo */}
        <Logo />

        {/* Signup form */}
        <div className='account__form'>
          <h1>Sign Up</h1>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            {/* Email input field */}
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
              {/* Error message for email validation */}
              <label className='input__account__error-label'>
                {errors.email && <p>Please enter a valid email</p>}
              </label>
            </div>

            {/* Password input field */}
            <div>
              <input
                className='input input__account'
                placeholder='Password'
                type='password'
                {...register('password', { required: true })}
                value={password}
                onChange={onChange}
              />
              {/* Error message for password validation */}
              <label className='input__account__error-label'>
                {errors.password && <p>Can't be empty</p>}
              </label>
            </div>

            {/* Repeat Password input field */}
            <div>
              <input
                className='input input__account'
                placeholder='Repeat Password'
                type='password'
                {...register('password2', { required: true })}
                value={password2}
                onChange={onChange}
              />
              {/* Error message for password confirmation */}
              <label className='input__account__error-label'>
                {errors.password2 && <p>Can't be empty</p>}
              </label>
            </div>

            {/* Submit button */}
            <button className='btn btn__account' type='submit'>
              Create an account
            </button>
          </form>

          {/* Footer section with a link to login */}
          <div className='account__footer'>
            <p>
              Already have an account? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Signup component
export default Signup;
