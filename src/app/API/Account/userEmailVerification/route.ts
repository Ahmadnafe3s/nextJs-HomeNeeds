import users from "@/model/userSchema";
import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import mailer from "@/helpers/mailer/nodeMailer";
import speakeasy from 'speakeasy'

connect()

export const POST = async (req: NextRequest) => {

    try {

        const { email, username } = await req.json()

        const isUser = await users.findOne({ email: email })
        const isUsername = await users.findOne({ username: username })


        if (isUsername) {
            return NextResponse.json({
                message: "username is already in use",
            }, { status: 400 })
        }


        if (isUser) {
            return NextResponse.json({
                message: "email already exists",
            }, { status: 400 })
        }


        const Secret: any = await speakeasy.generateSecret({ length: 10 })

        const OTP = await speakeasy.totp({
            secret: Secret.base32,
            encoding: 'base32',
            step: 300,
        })



        await mailer(email, 'Email Verification', { OTP })


        return NextResponse.json({
            message: 'we have sent an email verification code.',
            secret: Secret.base32
        })

    } catch (error: any) {

        return NextResponse.json({
            meassage: error.meassage
        }, { status: 400 })

    }

}