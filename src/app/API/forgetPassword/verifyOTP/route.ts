import { NextRequest, NextResponse } from "next/server";
import speakeasy from 'speakeasy'

export const POST = async (req: NextRequest) => {

    try {

        const DATA = await req.json()

        console.log(DATA);


        const isOTPverified = speakeasy.totp.verify({
            secret: DATA.secret,
            encoding: "base32",
            window: 2,
            token: DATA.OTP,
            step: 300
        })


        if (!isOTPverified) {
            return NextResponse.json({
                message: 'Invalid OTP!'
            }, { status: 400 })
        }

        return NextResponse.json({
            message: 'OTP verified , enter new password.'
        })


    } catch (error: any) {

        return NextResponse.json({
            message: error.message
        }, { status: 400 })

    }

}