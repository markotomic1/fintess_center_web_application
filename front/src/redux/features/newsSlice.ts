import { axiosInstance } from "@/utils/axiosInstance";
import { News, NewsState } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addError, removeError } from "./uiSlice";

const initialState: NewsState = {
  news: [],
};

export const addNewsAction = createAsyncThunk(
  "news/add",
  async (desc: string, thunkApi) => {
    try {
      const response = await axiosInstance.post(
        "/news",
        {
          newsDescription: desc,
        },
        { withCredentials: true }
      );

      thunkApi.dispatch(addNews(response.data));
    } catch (error: any) {
      thunkApi.dispatch(
        addError({ id: "addNewsError", message: error.response.data })
      );
      throw thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getNewsAction = createAsyncThunk(
  "news/get",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get("/news", {
        withCredentials: true,
      });

      thunkApi.dispatch(getAllNews(response.data));
      thunkApi.dispatch(removeError("getNewsError"));
    } catch (error: any) {
      thunkApi.dispatch(
        addError({ id: "getNewsError", message: error.response.data })
      );
      throw thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const deleteNewsAction = createAsyncThunk(
  "news/get",
  async (newsId: string, thunkApi) => {
    try {
      await axiosInstance.delete("/news/" + newsId, { withCredentials: true });

      thunkApi.dispatch(removeNews(newsId));
      thunkApi.dispatch(removeError("deleteNewsError"));
    } catch (error: any) {
      thunkApi.dispatch(
        addError({ id: "deleteNewsError", message: error.response.data })
      );
      throw thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addNews(state, action: PayloadAction<News>) {
      state.news.push(action.payload);
    },
    removeNews(state, action: PayloadAction<string>) {
      state.news = state.news.filter((news) => news.id !== action.payload);
    },
    getAllNews(state, action: PayloadAction<News[]>) {
      state.news = action.payload;
    },
  },
});

export default newsSlice.reducer;
export const { addNews, removeNews, getAllNews } = newsSlice.actions;
