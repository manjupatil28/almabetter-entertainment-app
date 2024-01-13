import axios from 'axios';

// API URL for user-related endpoints
const API_URL = '/user/';

// Function to validate user using a token
const validate = async (userData, token) => {
  // Configuration for the request, including authorization header and user data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  };

  // Send a GET request to validate the user
  const response = await axios.get(API_URL, config);

  // Return the response data
  return response.data;
};

// Function to register a new user
const register = async (userData) => {
  // Send a POST request to register the user
  const response = await axios.post(API_URL, userData);

  // If registration is successful, store user data in localStorage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  // Return the response data
  return response.data;
};

// Function to log in a user
const login = async (userData) => {
  // Send a POST request to log in the user
  const response = await axios.post(API_URL + 'login', userData);

  // If login is successful, store user data in localStorage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  // Return the response data
  return response.data;
};

// Function to log out a user (remove user data from localStorage)
const logout = () => {
  localStorage.removeItem('user');
};

// Object containing authentication service functions
const authService = {
  validate,
  register,
  login,
  logout,
};

// Export the authService object
export default authService;
