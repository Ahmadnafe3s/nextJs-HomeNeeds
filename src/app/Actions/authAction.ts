"use server"

import { signIn, signOut } from "@/auth"
import { CredentialsSignin } from "next-auth"
import { loginFormInputs } from "../(Auth)/logIn/page"



export const handleCredentialsSingnIn = async (formData: loginFormInputs) => {

    try {

        const { email_or_username, password } = formData

        await signIn('credentials', {
            email_or_username: email_or_username,
            password: password,
            redirect: false
        })


    } catch (err) {

        const error = err as CredentialsSignin

        return error.cause    // we dont have to throw or return new Error()
    }

}


