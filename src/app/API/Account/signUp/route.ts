import connect from "@/dbConfig/dbConfig"
import user from "@/model/userSchema"
import { NextRequest, NextResponse } from "next/server";
import mailer from "@/helpers/mailer/nodeMailer";
import bcryptjs from "bcryptjs"

connect();

export async function POST(req: NextRequest) {


    try {

        const { username, email, password } = await req.json()


        const isUser = await user.findOne({ email: email })
        const isUsername = await user.findOne({ username: username })


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


        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)


        const User = new user(
            {
                username: username,
                email: email,
                password: hashedPassword
            })


        await User.save()


        await mailer(email, "Verify Email")

        return NextResponse.json({
            message: "User created successfully",
        })


    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 })
    }

}

