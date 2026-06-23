/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../shared/api/axiosClient';

export const fetchQuizzes = createAsyncThunk('quiz/fetchQuizzes', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClient.get('/quizzes');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Lỗi kéo đề thi!');
  }
});

interface QuizState {
  list: any[];
  currentQuiz: any;
  currentQuestionIndex: number;
  score: number;
  isCompleted: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  list: [],
  currentQuiz: null,
  currentQuestionIndex: 0,
  score: 0,
  isCompleted: false,
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectQuiz: (state, action) => {
      state.currentQuiz = action.payload;
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.isCompleted = false;
    },
    submitAnswer: (state, action) => {
      const selectedIndex = action.payload;
      const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
      
      if (selectedIndex === currentQuestion.correctAnswerIndex) {
        state.score += 1;
      }

      if (state.currentQuestionIndex + 1 < state.currentQuiz.questions.length) {
        state.currentQuestionIndex += 1;
      } else {
        state.isCompleted = true;
      }
    },
    restartQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.isCompleted = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectQuiz, submitAnswer, restartQuiz } = quizSlice.actions;
export default quizSlice.reducer;
