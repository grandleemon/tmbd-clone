import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    }
}) 

export const {addUser} = userInfoSlice.actions

export default userInfoSlice;