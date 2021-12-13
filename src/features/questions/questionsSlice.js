import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../common/utils/_DATA';

const initialState = {
  questions: {},
  status: 'initial',
};

const reducers = {};

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await _getQuestions();
  return response;
});

export const addQuestion = createAsyncThunk('questions/addQuestion', async question => {
  const response = await _saveQuestion(question);
  return response;
});

export const questionVote = createAsyncThunk('question/vote', async vote => {
  const response = await _saveQuestionAnswer(vote);
  return response;
})

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers,
    extraReducers: builder => {
      builder.addCase(fetchQuestions.pending, state => {
        state.status = 'pending';
      });
      builder.addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'completed';
        state.questions = action.payload;
      });
      builder.addCase(addQuestion.fulfilled, (state, action) => {
        const newQuestion = action.payload;
        state.questions[newQuestion.id] = newQuestion;
      });
    }
});

export default questionsSlice.reducer;
export const getAllQuestions = state => state.questions.questions;
export const getSingleQuestion = (state, questionId) => Object.values(state.questions.questions).find(question => question.id === questionId);