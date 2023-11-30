import { Plan, PlanSlice } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addError, removeError } from "./uiSlice";
import { axiosInstance } from "@/utils/axiosInstance";

const initialState: PlanSlice = {
  plans: [],
  choosenPlan: {
    planDescription: [],
    planName: "",
    id: "",
    planPrice: "",
  },
};

export const getPlanAction = createAsyncThunk(
  "plan/get",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/plan/", {
        withCredentials: true,
      });
      thunkAPI.dispatch(removeError("getPlanError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "getPlanError", message: error.response.data })
      );

      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addPlanAction = createAsyncThunk(
  "plan/add",
  async (data: Plan, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/plan/add", data, {
        withCredentials: true,
      });
      thunkAPI.dispatch(removeError("addPlanError"));
      thunkAPI.dispatch(addPlan(response.data));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "addPlanError", message: error.response.data })
      );

      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getPlansAction = createAsyncThunk(
  "plan/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/plan/getAll", {
        withCredentials: true,
      });
      thunkAPI.dispatch(removeError("getPlansError"));
      thunkAPI.dispatch(addPlans(response.data));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "getPlansError", message: error.response.data })
      );

      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletePlanAction = createAsyncThunk(
  "plan/getAll",
  async (id: string, thunkAPI) => {
    try {
      await axiosInstance.delete("/plan/" + id, {
        withCredentials: true,
      });
      thunkAPI.dispatch(removeError("deletePlanError"));
      thunkAPI.dispatch(deletePlan(id));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "deletePlanError", message: error.response.data })
      );

      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const planSlice = createSlice({
  initialState,
  name: "plan",
  reducers: {
    addPlan(state, action: PayloadAction<Plan>) {
      state.plans.push(action.payload);
    },
    addPlans(state, action: PayloadAction<Plan[]>) {
      state.plans = action.payload;
    },
    deletePlan(state, action: PayloadAction<string>) {
      state.plans = state.plans.filter((plan) => plan.id !== action.payload);
    },
    setChosenPlan(state, action: PayloadAction<Plan>) {
      state.choosenPlan = action.payload;
    },
  },
});

export default planSlice.reducer;

export const { addPlan, addPlans, deletePlan, setChosenPlan } =
  planSlice.actions;
