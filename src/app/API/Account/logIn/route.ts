import connect from "@/dbConfig/dbConfig"
import user from "@/model/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export const POST = async (req: NextRequest) => {
    try {
        const { email_or_username, password } = await req.json()

        const User = await user.findOne({ $or: [{ email: email_or_username }, { username: email_or_username }] })

        if (!User) {
            return NextResponse.json({
                message: 'User not found!'
            }, { status: 404 })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, User.password);


        if (!isPasswordCorrect) {
            return NextResponse.json({
                message: 'user or password is incorrect!'
            }, { status: 400 })
        }


        const Token = await jwt.sign(
            {
                username: User.username,
                email: User.email,
            },
            process.env.JWT_TOKEN_SECRET!,
            { expiresIn: '1d' }
        )


        const Response = NextResponse.json({
            userName: User.username,
            email: User.email,
            message: 'User logged in successfully!',
        })

        Response.cookies.set('token', Token, { expires: new Date(Date.now() + 1000 * 86400), httpOnly: true , sameSite : 'lax'})

        return Response

    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }
}