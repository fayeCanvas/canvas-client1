import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GoalHelper from "../_helpers/goal.helper";
import { setMessage } from "./message";

const user =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

export const getGoalByPatientId = createAsyncThunk(
  "/goals/getGoalByPatientId",
  async (id, thunkAPI) => {
    try {
      return await GoalHelper.getGoalByPatientId(id);
    } catch (error) {
      console.log('error', error)
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
export const getQuestionsByGoalId = createAsyncThunk(
  "/goals/getQuestionsByGoalId",
  async (id, thunkAPI) => {
    try {
      return await GoalHelper.getQuestionsByGoalId(id);
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
export const addGoalAnswer = createAsyncThunk(
  "/goals/addGoalAnswer",
  async ({ payload, resetForm, answerSubmitCallback }, thunkAPI) => {
    try {
      const response = await GoalHelper.addGoalAnswer(payload);
      resetForm();
      answerSubmitCallback();
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

export const markGoalAsCompleted = createAsyncThunk(
  "/goals/markGoalAsCompleted",
  async ({ id, callBackFun }, thunkAPI) => {
    try {
      const response = await GoalHelper.markGoalAsCompleted(id);

      callBackFun();
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
export const addGoals = createAsyncThunk(
  "/addGoals",
  async ({ payload, callBackFun, onSuccessFunc }, thunkAPI) => {
    try {
      const response = await GoalHelper.createGoals(payload);
      callBackFun();
      onSuccessFunc();
      return response;
    } catch (error) {
      console.log('error adding goal', error)
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
  patientGoals: [],
  goalsQuestions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  extraReducers: {
    [getGoalByPatientId.pending]: (state) => {
      state.isLoading = true;
    },
    [getGoalByPatientId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.patientGoals = action.payload;
    },
    [getGoalByPatientId.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.patientGoals = [];
    },
    [getQuestionsByGoalId.pending]: (state) => {
      state.isLoading = true;
    },
    [getQuestionsByGoalId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goalsQuestions = action.payload;
    },
    [getQuestionsByGoalId.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.goalsQuestions = [];
    },
    [addGoalAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [addGoalAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [addGoalAnswer.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [markGoalAsCompleted.pending]: (state) => {
      state.isLoading = true;
    },
    [markGoalAsCompleted.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [markGoalAsCompleted.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [addGoals.pending]: (state) => {
      state.isLoading = true;
    },
    [addGoals.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.addedGoals = action.payload;
    },
    [addGoals.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.addedGoals = [];
    },
  },
});

const { reducer } = goalSlice;
export default reducer;
