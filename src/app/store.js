import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import questionsReducer from '../features/questions/questionsSlice';
import usersReducer from '../features/users/usersSlice';

const reducer = {
    users: usersReducer,
    questions: questionsReducer,
};

export default configureStore({
    reducer,
    middleware: [thunk, logger],
    devTools: true,
});