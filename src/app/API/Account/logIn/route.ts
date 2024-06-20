import connect from "@/dbConfig/dbConfig"
import user from "@/model/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();
        const User = await user.findOne({ email })

        if (!User) {
            return NextResponse.json({
                message: 'User not found!'
            }, { status: 404 })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, User.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({
                message: 'email or password is incorrect!'
            }, { status: 400 })
        }

        const Token = await jwt.sign(
            {
                name: User.fullName,
                email: User.email,
                UID: User.UID
            },
            process.env.JWT_TOKEN_SECRET!,
            { expiresIn: '1d' }
        )

        console.log(Token);

        const Response = NextResponse.json({
            UID: User.UID,
            userName: User.fullName,
            email: User.email,
            message: 'User logged in successfully!',
        })

        Response.cookies.set('token', Token, { expires: new Date(Date.now() + 1000 * 86400), httpOnly: true })

        return Response

    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }
}