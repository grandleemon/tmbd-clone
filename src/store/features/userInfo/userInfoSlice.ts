import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../../../api";

interface UserState {
    id: string | null,
    name: string | null
}

const initialState: UserState = {
    id: null,
    name: null
}

export const userInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action : PayloadAction<UserState>) => {
            const {id, name} = action.payload
            state.id = id
            state.name = name
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                if(action.payload) {
                    state.id = action.payload.data.id
                    state.name = action.payload.data.username
                }
            })
    }
}) 

export const fetchUserData = createAsyncThunk('userInfo/fetchUserData', async (session: string | null) => {
    if(session) {
        const response = await userApi.getUserData(session)
        return response
    }
})

export const {addUser} = userInfoSlice.actions

export default userInfoSlice;