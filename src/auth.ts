import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import axios from "axios";

type useType = {
    id: string,
    name: string,
    email: string
}

export const { signIn, signOut, handlers, auth } = NextAuth({

    // Configure one or more authentication providers

    providers: [

        Credentials(
            {

                credentials: {
                    email_or_username: {},
                    password: {}
                },

                async authorize({ email_or_username, password }) {

                    try {

                        // i am getting user data by validating in api route to get rid of edge anvironment error in mongoose package

                        const response = await axios.post(process.env.DOMAIN + '/api/Account/getUser', { email_or_username, password }) // this ('/api/Account/getUser') only works on clent side 

                        const { id, name, email } = response.data

                        return { id, name: name, email: email }

                    } catch (err: any) {

                        throw new CredentialsSignin({ cause: err.response.data.message })
                    }

                }
            }
        )
    ],


    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24
    },

    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: '/logIn',
    },

})