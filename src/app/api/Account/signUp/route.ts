import connect from "@/dbConfig/dbConfig"
import user from "@/model/userSchema"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import speakeasy from 'speakeasy'

await connect();

export async function POST(req: NextRequest) {


    try {

        const { username, email, password, OTP, secret } = await req.json()

        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)


        const isOTPverified = speakeasy.totp.verify({
            secret: secret,
            encoding: "base32",
            window: 2,
            token: OTP,
            step: 300
        })


        if (!isOTPverified) {
            return NextResponse.json({
                message: 'Invalid OTP!'
            }, { status: 400 })
        }


        const User = new user(
            {
                username: username,
                email: email,
                password: hashedPassword
            })


        await User.save()

        
        return NextResponse.json({
            message: "User created successfully",
        })


    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }

}

