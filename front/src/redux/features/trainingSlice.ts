import { axiosInstance } from "@/utils/axiosInstance";
import { Training, TrainingState } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addError, removeError } from "./uiSlice";

const initialState: TrainingState = {
  trainings: [],
};
//add training

export const addTrainingAction = createAsyncThunk(
  "training/add",
  async (trainingData: Training, thunkAPI) => {
    try {
      const response = await axiosInstance.post<Training>(
        "/training/add",
        {
          name: trainingData.trainingName,
          time: trainingData.trainingTime,
          day: trainingData.trainingDay,
        },
        {
          withCredentials: true,
        }
      );
      thunkAPI.dispatch(addTraining(response.data));
      thunkAPI.dispatch(removeError("addTrainingError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "addTrainingError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//get all trainings

export const getTrainings = createAsyncThunk(
  "training/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<Training[]>("/training/", {
        withCredentials: true,
      });
      thunkAPI.dispatch(addAllTrainings(response.data));
      thunkAPI.dispatch(removeError("getTrainingsError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "getTrainingsError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//remove training

export const removeTrainingAction = createAsyncThunk(
  "training/remove",
  async (id: string, thunkAPI) => {
    try {
      await axiosInstance.delete("/training/" + id, { withCredentials: true });

      thunkAPI.dispatch(removeTraining(id));
      thunkAPI.dispatch(removeError("removeTrainingError"));
    } catch (error: any) {
      thunkAPI.dispatch(
        addError({ id: "removeTrainingError", message: error.response.data })
      );
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    addTraining(state, action: PayloadAction<Training>) {
      state.trainings.push(action.payload);
    },
    removeTraining(state, action: PayloadAction<string>) {
      state.trainings = state.trainings.filter(
        (training) => training.id !== action.payload
      );
    },
    addAllTrainings(state, action: PayloadAction<Training[]>) {
      state.trainings = action.payload;
    },
  },
});
export const { addTraining, removeTraining, addAllTrainings } =
  trainingSlice.actions;
export default trainingSlice.reducer;
