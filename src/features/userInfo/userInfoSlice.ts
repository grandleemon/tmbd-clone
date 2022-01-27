import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
        addUser: (state, action) => {
            const {id, name}: UserState = action.payload
            state.id = id
            state.name = name
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.id = action.payload.data.id
                state.name = action.payload.data.username
            })
    }
}) 

export const fetchUserData = createAsyncThunk('userInfo/fetchUserData', async (session: any) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session}`)
    return response
})

export const {addUser} = userInfoSlice.actions

export default userInfoSlice;