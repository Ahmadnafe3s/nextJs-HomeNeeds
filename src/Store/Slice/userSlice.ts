/*

CODE ID : 1 

I am securing that localstorage should only visible on client side. So, at the server side typeof window return undefined.  And at client side it return null. So, we are checking if it's null then we are setting user to null else we are parsing . 

Specific if localstorage doesnt have corresponding key then it will return null otherwise user (data) . on the client side. 

At the server side initial state will always null .

*/

import { createSlice } from "@reduxjs/toolkit";

type userType = {
    user: {
        UID: number,
        userName: string,
        email: string,
    } | null
}


const initialState: userType = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')!) : null, // CODE ID 1
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: { payload: userType["user"] }) => {
            state.user = action.payload // first time state will change 
            localStorage.setItem('user', JSON.stringify(action.payload)); // Also Safing data for reload
        },

        removeUser: (state) => {
            state.user = null
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        }
    }
})


export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer