import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import users from "@/model/userSchema";
import speakeasy from 'speakeasy'
import mailer from "@/helpers/mailer/nodeMailer";

await connect();

export const POST = async (req: NextRequest) => {

    try {

        const {email_or_username} = await req.json()

        const user = await users.findOne({ $or: [{ email: email_or_username }, { username: email_or_username }] })

        if (!user) {
            return NextResponse.json({
                message: 'user not found!'
            }, { status: 404 })
        }



        const Secret: any = await speakeasy.generateSecret({ length: 10 })

        const OTP = await speakeasy.totp({
            secret: Secret.base32,
            encoding: 'base32',
            step: 300,
        })



        await mailer(user.email, 'Reset Password', { OTP, username: user.username })


        return NextResponse.json({
            message: 'Email verified, enter OTP.',
            secret: Secret.base32,
        })


    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 400 })
    }
}