import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../../../api";

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
        addToken: (state, action: PayloadAction<UserTokenState>) => {
            const {userToken} = action.payload
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
    const response = await authApi.getToken()
    return response.data
})

export const {addToken} = userTokenSlice.actions

export default userTokenSlice;