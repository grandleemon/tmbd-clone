import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { userTokenSelector } from "../userToken";

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
        createSession: (state, action) => {
            const {userSession}: UserSessionState = action.payload
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
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`, {request_token: token})
    return response.data.session_id
})

export const {createSession} = userSessionSlice.actions

export default userSessionSlice;