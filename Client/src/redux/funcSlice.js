import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: -1,
    username: null,
    role: null,
    token: null,
    messages: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        store_login: (state, actions) => {
            state.id = actions.payload.id
            state.username = actions.payload.username
            state.role = actions.payload.role
            state.token = actions.payload.token
        },
        clear_logout: (state) => {
            state.id = -1
            state.username = null
            state.role = null
            state.token = null
            state.messages = []
        },
        storeChat: (state, actions) => {
            state.messages = actions.payload
        },
    },
})

export const { store_login } = userSlice.actions
export const { clear_logout } = userSlice.actions
export const { storeChat } = userSlice.actions
export const selectUserData = (state) => state.user
export const selectUserId = (state) => state.user.id
export const selectUserUsername = (state) => state.user.username
export const selectUserRole = (state) => state.user.role
export const selectUserToken = (state) => state.user.token
export const selectUserMessages = (state) => state.user.messages
export default userSlice.reducer
