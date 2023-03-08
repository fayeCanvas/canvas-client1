import axios from 'axios';
import { API_ROOT } from './set_root'
import Cookies from 'universal-cookie';

const cookie = new Cookies();


const register = async (user) => {
  return await axios.post(API_ROOT + "/api/auth/register", user)
    .then((response) => {
      if (response.data.token) {
        cookie.set('token', response.data.token, { path: '/' })
        cookie.set('refreshToken', response.data.refreshToken, { path: '/' })
        cookie.set('user', response.data.user, { path: '/' })
        return response.data
      }
    })
    .catch((err) => {
      return { error: err.response }
    });
};

const login = async (email, password) => {
  return axios
  .post(API_ROOT + "/api/auth/login",
    {
      email,
      password
    })
    .then((response) => {
      if (response.data.token) {
        let myUser = {
          // patients: response.data.user.patients,
          id: response.data.user._id,
          _id: response.data.user._id,
          email: response.data.user.email,
          role: response.data.user.role,
          firstName: response.data.user.firstName || null
        }
        cookie.set('token', response.data.token, { path: '/' })
        cookie.set('refreshToken', response.data.refreshToken, { path: '/' })
        cookie.set('user', myUser, { path: '/' })
      }
      return response.data;
    });
};

// Reference-Client uses cookie.remove('user') for 'token' and 'refeshToken' as well
const logout = () => {
  localStorage.removeItem("user");
  cookie.remove('user', { path: '/' })
  cookie.remove('refreshToken', { path: '/' })
  cookie.remove('token', { path: '/' })
};

const AuthHelper = {
  register,
  login,
  logout
};

export default AuthHelper;
