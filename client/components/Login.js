import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { authReset, login } from '../features/auth/authSlice';
import { getBookmarks } from '../features/bookmark/bookmarkSlice';

import Logo from '../assets/logo.svg';

// Login Component
function Login() {
  // React hook to enable navigation
  const navigate = useNavigate();

  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  // Local state for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // useEffect to handle side effects based on authentication state changes
  useEffect(() => {
    console.log(formData);

    // If login is successful, retrieve bookmarks and navigate to the home page
    if (isSuccess && user) {
      dispatch(getBookmarks());
      navigate('/');
    }

    // Cleanup function to reset authentication state on component unmount
    return () => {
      dispatch(authReset());
    }
  }, [user, isError, isSuccess, message, formData, navigate, dispatch]);

  // Function to handle input changes
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Function to handle form submission
  const onSubmit = () => {
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  }

  // JSX structure for rendering Login component
  return (
    <div className='account__wrapper'>
      <div className='account'>
        {/* Application logo */}
        <Logo />

        {/* Login form */}
        <div className='account__form'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email input field */}
            <div>
              <input
                className='input input__account'
                placeholder='Email address'
                type='email'
                {...register('email', { required: true })}
                value={email}
                onChange={onChange}
              />
              {/* Error message for email validation */}
              <label className='input__account__error-label'>
                {errors.email && <p>Can't be empty</p>}
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

            {/* Submit button */}
            <button className='btn btn__account' type='submit'>
              Login to your account
            </button>
          </form>

          {/* Footer section with a link to sign up */}
          <div className='account__footer'>
            <p>
              Don't have an account? <a href='/signup'>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Login component
export default Login;
