import { axiosInstance } from "@/utils/axiosInstance";
import {
  ContactData,
  Plan,
  UpdateUser,
  User,
  UserLogin,
  UserSlice,
  UserState,
} from "@/utils/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addError, removeError } from "./uiSlice";

//get logged in user
export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<UserState>("/user/me", {
      withCredentials: true,
    });

    thunkAPI.dispatch(removeError("getUserError"));
    thunkAPI.dispatch(login());
    return data;
  } catch (error: any) {
    thunkAPI.dispatch(
      addError({ id: "getUserError", message: error.response.data })
    );
    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

//register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (user: User, thunkAPI) => {
    try {
      await axiosInstance.post<{
        token: string;
        message: string;
      }>("/user/register", user, { withCredentials: true });
      thunkAPI.dispatch(removeError("registerError"));
      thunkAPI.dispatch(login());
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
      await axiosInstance.post<{
        token: string;
        message: string;
      }>("/user/login", user, { withCredentials: true });
      thunkAPI.dispatch(removeError("loginError"));
      thunkAPI.dispatch(login());
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "loginError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//send email

export const sendEmail = createAsyncThunk(
  "mail/send",
  async (contactData: ContactData, thunkAPI) => {
    try {
      await axiosInstance.post("/mail/send", contactData);
      thunkAPI.dispatch(removeError("sendMailError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "sendMailError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//logout user

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/user/logout", _, { withCredentials: true });
      thunkAPI.dispatch(logout());
      thunkAPI.dispatch(removeError("logoutError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "logoutError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//check old password
export const changePasswordAction = createAsyncThunk(
  "user/changePassword",
  async (data: { oldPassword: string; newPassword: string }, thunkAPI) => {
    try {
      await axiosInstance.patch(
        "/user/changePassword",
        { ...data },
        {
          withCredentials: true,
        }
      );
      thunkAPI.dispatch(removeError("changePasswordError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "changePasswordError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//update profile settings

export const updateUserAction = createAsyncThunk(
  "/user/editProfile",
  async (user: UpdateUser, thunkAPI) => {
    try {
      const response = await axiosInstance.patch("/user", user, {
        withCredentials: true,
      });
      thunkAPI.dispatch(setUser(response.data));
      thunkAPI.dispatch(removeError("updateUserError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "updateUserError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//puchase a plan

export const purchasePlan = createAsyncThunk(
  "user/purchase",
  async (
    data: { id: string; startDate: string; endDate: string },
    thunkAPI
  ) => {
    try {
      await axiosInstance.patch(
        "/user/purchasePlan",
        {
          plan: {
            id: data.id,
            startDate: data.startDate,
            endDate: data.endDate,
          },
        },
        { withCredentials: true }
      );
      await thunkAPI.dispatch(getUser()).unwrap();
      thunkAPI.dispatch(removeError("purchasePlanError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "purchasePlanError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// upload image

export const uploadImageAction = createAsyncThunk(
  "user/imgUpload",
  async (imgUrl: string, thunkAPI) => {
    try {
      await axiosInstance.patch(
        "/user/storeImg",
        { imgUrl },
        { withCredentials: true }
      );
      await thunkAPI.dispatch(getUser()).unwrap();
      thunkAPI.dispatch(removeError("uploadImgError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "uploadImgError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// getAll users

export const getAllUsersAction = createAsyncThunk(
  "user/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/user/getAll", {
        withCredentials: true,
      });
      thunkAPI.dispatch(setUsers(response.data));
      thunkAPI.dispatch(removeError("getAllUsersError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "getAllUsersError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteUserAction = createAsyncThunk(
  "user/delete",
  async (username: string, thunkAPI) => {
    try {
      await axiosInstance.delete("/user/" + username, {
        withCredentials: true,
      });
      thunkAPI.dispatch(getAllUsersAction());
      thunkAPI.dispatch(removeError("deleteUserError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "deleteUserError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const changeUserRoleAction = createAsyncThunk(
  "user/changeRole",
  async (data: { username: string; newRole: "USER" | "TRAINER" }, thunkAPI) => {
    try {
      await axiosInstance.patch(
        "/user/changeRole",
        { username: data.username, newRole: data.newRole },
        {
          withCredentials: true,
        }
      );
      await thunkAPI.dispatch(getAllUsersAction());
      thunkAPI.dispatch(removeError("changeUserRoleError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "changeUserRoleError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const setUsersPlanAction = createAsyncThunk(
  "user/setPlan",
  async (planId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/plan/" + planId, {
        withCredentials: true,
      });

      thunkAPI.dispatch(removeError("setUserPlanError"));

      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "setUserPlanError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState: UserSlice = {
  users: [],
  currentUser: {
    isLoggedIn: false,
    username: "",
    name: "",
    surname: "",
    email: "",
    role: "",
    planName: "",
    startDateOfPlan: "",
    endDateOfPlan: "",
    imgUrl: "",
    planId: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.currentUser.isLoggedIn = true;
    },
    logout(state) {
      state.currentUser.isLoggedIn = false;
    },
    setUser(state, action: PayloadAction<UpdateUser>) {
      const newUser = { ...state.currentUser, ...action.payload };
      state.currentUser = { ...newUser };
    },
    setUsers(state, action: PayloadAction<UserState[]>) {
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        const newUser = { ...state.currentUser, ...action.payload };
        state.currentUser = { ...newUser };
      }
    );
    builder.addCase(logoutUser.fulfilled, () => {
      return initialState;
    });
    builder.addCase(
      setUsersPlanAction.fulfilled,
      (state, action: PayloadAction<Plan>) => {
        const newUsers = state.users.slice();
        for (let index = 0; index < newUsers.length; index++) {
          const user = newUsers[index];
          if (user.planId === action.payload.id) {
            user.planName = action.payload.planName;
          }
        }
        state.users = newUsers;
      }
    );
  },
});
export default userSlice.reducer;
export const { login, setUser, logout, setUsers } = userSlice.actions;
