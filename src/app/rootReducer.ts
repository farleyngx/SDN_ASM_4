import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import quizReducer from '../features/quiz-runner/quizSlice';
import managerReducer from '../features/question-manager/managerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  manager: managerReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
