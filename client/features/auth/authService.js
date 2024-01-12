import axios from 'axios'

const API_URL = '/user/'

// Validate User
const validate = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: userData,
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  validate,
  register,
  login,
  logout,
}

export default authService
