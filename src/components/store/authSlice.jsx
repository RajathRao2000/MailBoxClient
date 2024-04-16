import { createSlice } from "@reduxjs/toolkit";

const initialState={
    idToken: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")).token
    : "",
    isAuthenticated: !!localStorage.getItem("token")

}

const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{
        signin(state,action){
            state.idToken=action.payload.idToken
            state.isAuthenticated=true
            localStorage.setItem("token",JSON.stringify({
                idToken: action.payload.idToken,
                email: action.payload.email,
                Cemail: action.payload.email.replace(/[.@]/g, ""),
                date: new Date()
            }))
        },
        signout(state){
            state.idToken=""
            state.isAuthenticated=false
            localStorage.removeItem("token")
        }
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer