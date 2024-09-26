import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import connect from "./dbConfig/dbConfig";
import users from "./model/userSchema";


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

                    await connect()

                    const User = await users.findOne({ $or: [{ email: email_or_username }, { username: email_or_username }] })

                    if (!User) {
                        throw new CredentialsSignin({ cause: 'User not found!' })
                    }

                    const isPasswordCorrect = await bcrypt.compare(password as string, User.password);

                    if (!isPasswordCorrect) {
                        throw new CredentialsSignin({ cause: 'user or password is incorrect!' })
                    }
                    
                    return { name: User.username, email: User.email}
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
    }

})