import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthHelper from "../_helpers/auth.helper";
// import cookie from 'react-cookies';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const user = typeof window !== 'undefined' ? cookie.get('user') : 'no window or undefined'

// during registration, should be setup so that only patients can register?
// automatically assign 'patient' role
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await AuthHelper.register(user);
      if (response.error) {
        let error = response.error
        const message =
          (error &&
            error.data &&
            error.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
      // send message in response at *data.message* from server at register route!

      thunkAPI.dispatch(setMessage('Success'));
      return response;
    } catch (error) {
      console.log('error in auth slice', error)
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthHelper.login(email, password);
      // console.log(authSlice.reducer
      // thunkAPI.dispatch(loginSuccess({user: data}))
      return { user: data };
    } catch (error) {
      console.log('err', error)
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(error.response.data.message));
      return thunkAPI.rejectWithValue();
    }
  }
)

export const getPasswordToken = createAsyncThunk(
  'auth/forgotPassword',
  async({email}, thunkAPI) => {
    return axios.post(`${API_ROOT}/auth/forgot-password`, { email })
        .then((response) => {
          dispatch({
            type: userConstants.FORGOT_PASSWORD_REQUEST,
            payload: response.data.message,
          });
          window.location.href = `${CLIENT_ROOT}/passwordresetconfirmation`
        })
        .catch((error) => {
          dispatch(failure(error.toString()));
        });
    function failure(error) { return { type: userConstants.FORGOT_PASSWORD_FAILURE, error } }

  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthHelper.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload.user
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false,
        state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

const { reducer } = authSlice;
export default reducer;
