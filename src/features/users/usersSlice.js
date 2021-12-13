import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getUsers } from '../../common/utils/_DATA';
import { addQuestion, questionVote } from '../questions/questionsSlice';

const initialState = {
    users: {},
    currentUser: '',
    status: 'idle',
};

const reducers = {
    userLogin(state, action) {
        state.currentUser = action.payload;
    },
    userLogout(state) {
        state.currentUser = '';
    },
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await _getUsers();
    return response;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers,
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'completed';
        });
        builder.addCase(addQuestion.fulfilled, (state, action) => {
            state.users[action.meta.arg.author].questions.push(action.payload)
        });
        builder.addCase(questionVote.fulfilled, (state, action) => {
            state.users[action.meta.arg.authedUser].answers[action.meta.arg.qid] = action.meta.arg.answer
        });
    }
});

export default usersSlice.reducer;
export const { userLogin, userLogout } = usersSlice.actions;
export const getAllUsers = state => state.users.users;
export const getCurrentUser = state => state.users.currentUser;
export const getCurrentUserData = state => state.users.users[state.users.currentUser];