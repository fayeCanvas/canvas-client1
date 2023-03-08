import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PatientHelper from "../_helpers/patient.helper";
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const user = cookie.get('user');

// const user = typeof window !== "undefined" ? cookie.get("user") : null;

export const getAllPatients = createAsyncThunk(
  "/patients/getAllPatients",
  async (thunkAPI) => {
    try {
      return await PatientHelper.getAllPatients(user);

      //   if (response.error) {
      //     let error = response.error;
      //     console.log("response in auth js", error);
      //     const message =
      //       (error && error.data && error.data.message) ||
      //       error.message ||
      //       error.toString();
      //     console.log("message", message);
      //     thunkAPI.dispatch(setMessage(message));
      //     return thunkAPI.rejectWithValue();
      //   }
      // send message in response at data.message from server at register route!
      //   thunkAPI.dispatch(setMessage("Success"));
        // return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
      //   console.log("error in auth slice", error);
    }
  }
);

export const addPatient = createAsyncThunk(
  "/patients/addPatient",
  async ({ payload, callBackFun, modalClose }, thunkAPI) => {
    try {

      const response = await PatientHelper.addPatient(payload);


      callBackFun();
      modalClose();
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  patients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  extraReducers: {
    [getAllPatients.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPatients.fulfilled]: (state, action) => {
      if (action.payload.isAxiosError) {
        if (action.payload.response.status == 401) {
          window.location = '/login'
        }
      }
      state.isLoading = false;
      state.isSuccess = true;
      state.patients = action.payload ? action.payload[0].patients :  [];
    },
    [getAllPatients.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.patients = [];
    },
    [addPatient.pending]: (state) => {
      state.isLoading = true;
    },
    [addPatient.fulfilled]: (state, action) => {
      let newList = [...state.patients, action.payload];
      state.isLoading = false;
      state.isSuccess = true;
      state.patients = [...state.patients, action.payload];
    },
    [addPatient.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

const { reducer } = patientSlice;
export default reducer;
