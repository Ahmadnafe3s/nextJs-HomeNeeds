/*

CODE ID : 1 

I am securing that getUserData() should only visible on client side. So, at the server side typeof window return undefined.  
And at client side it return null.So, we are checking if it's null then we are getting user data from getUserData().
otherwise we will assign it to null.

At the server side initial state will always null .

*/

import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';




function getUserData() {

    const user = Cookies.get('user')

    if (user) {
        return JSON.parse(user)
    }

    return null
}



type userType = {
    user: {
        UID: number,
        userName: string,
        email: string,
    } | null
}


const initialState: userType = {
    user: typeof window !== 'undefined' ? getUserData() : null, // CODE ID 1
}



const userSlice = createSlice({

    name: 'user',
    initialState,

    reducers: {

        setUser: (state, action: { payload: userType["user"] }) => {
            state.user = action.payload // first time state will change 
            Cookies.set('user', JSON.stringify(action.payload), { expires: new Date(Date.now() + 1000 * 86398) })
        },

        removeUser: (state) => {
            state.user = null
            if (typeof window !== 'undefined') {
                Cookies.remove('user')
            }
        }

    }
})


export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer