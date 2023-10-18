import { axiosInstance } from "@/utils/axiosInstance";
import {
  ContactData,
  User,
  UserLogin,
  UserRegister,
  UserState,
} from "@/utils/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addError, removeError } from "./uiSlice";

//get logged in user
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<UserState>("/user/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    thunkAPI.dispatch(removeError("getUserError"));
    return data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addError({ id: "getUserError", message: error.response.data })
    );
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

//register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (user: User, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post<{
        token: string;
        message: string;
      }>("/user/register", user);
      thunkAPI.dispatch(removeError("registerError"));
      thunkAPI.dispatch(login(data.token));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "registerError", message: error.response.data })
      );
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
//login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (user: UserLogin, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post<{
        token: string;
        message: string;
      }>("/user/login", user);
      thunkAPI.dispatch(removeError("loginError"));
      thunkAPI.dispatch(login(data.token));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "loginError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//send email

export const sendeEmail = createAsyncThunk(
  "mail/send",
  async (contactData: ContactData, thunkAPI) => {
    try {
      await axiosInstance.post("/mail/send", contactData);
      thunkAPI.dispatch(removeError("mailError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "mailError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState: UserState = {
  username: "",
  name: "",
  surname: "",
  email: "",
  role: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      return initialState;
    },
    login: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        return { ...state, ...action.payload };
      }
    );
  },
});
export default userSlice.reducer;
export const { logout, login } = userSlice.actions;
