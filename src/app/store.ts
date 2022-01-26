import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from '../features/userInfo/userInfoSlice'
import { userTokenSlice } from "../features/userToken";


const store = configureStore({
    reducer: {
        userInfo: userInfoSlice.reducer,
        userToken: userTokenSlice.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;