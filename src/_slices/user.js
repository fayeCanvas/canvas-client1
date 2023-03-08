import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserHelper from "../_helpers/user-helper";

const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;



export const getUserDetailsById = createAsyncThunk(
    "/getUserDetailsById",
    async (id, thunkAPI) => {
         
        try {
             
            return await UserHelper.getUserDetails(id);
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
    userDetail: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

const userSlice = createSlice({
    name: "userDetail",
    initialState,
    extraReducers: {
        [getUserDetailsById.pending]: (state) => {
            state.isLoading = true;
        },
        [getUserDetailsById.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.userDetail = action.payload;
        },
        [getUserDetailsById.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.userDetail = [];
        },
    },
});

const { reducer } = userSlice;
export default reducer;
