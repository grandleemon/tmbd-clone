import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string,
    name: string
}

const initialState: UserState = {
    id: '',
    name: ''
}

export const userInfoSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const {id, name}: any = action.payload
            state.id = id
            state.name = name
        }
    }
}) 

export const {addUser} = userInfoSlice.actions

export default userInfoSlice.reducer