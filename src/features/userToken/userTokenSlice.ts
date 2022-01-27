import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserTokenState {
    userToken: string | null
}

const initialState: UserTokenState = {
    userToken: null
}

export const userTokenSlice = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        addToken: (state, action) => {
            const {userToken}: UserTokenState = action.payload
            state.userToken = userToken
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchRequestToken.fulfilled, (state, action) => {
                state.userToken = action.payload
            })
    }
}) 

export const fetchRequestToken = createAsyncThunk('userToken/fetchUserToken', async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`)
    return response.data.request_token
})

export const {addToken} = userTokenSlice.actions

export default userTokenSlice;