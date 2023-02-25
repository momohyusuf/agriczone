import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import globalReducer from './features/global/globalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
