import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { authApi } from "../../../api";

interface UserSessionState {
    userSession: string | null
}

const initialState: UserSessionState = {
    userSession: null
}

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    reducers: {
        createSession: (state, action: PayloadAction<UserSessionState>) => {
            const {userSession} = action.payload
            state.userSession = userSession
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserSession.fulfilled, (state, action) => {
                state.userSession = action.payload
            })
    }
}) 

export const fetchUserSession = createAsyncThunk('userSession/fetchUserSession', async (token: string) => {
    const response = await authApi.getSession(token)
    return response.data
})

export const {createSession} = userSessionSlice.actions

export default userSessionSlice;