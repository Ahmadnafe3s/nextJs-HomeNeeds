import connect from "@/dbConfig/dbConfig"
import user from "@/model/userSchema"
import { NextRequest, NextResponse } from "next/server";
import mailer from "@/helpers/mailer/nodeMailer";
import bcryptjs from "bcryptjs"

connect();

export async function POST(req: NextRequest) {

    const genID = () => {
        const range = '0123456789'
        let id = ''
        for (let i = 0; i < 8; i++) {
            id += range[Math.round(Math.random() * 5)]
        }

        return id
    }


    try {

        const { fullName, email, password } = await req.json()


        const isUser = await user.findOne({ email: email })

        genID()

        if (isUser) {
            return NextResponse.json({
                message: "User already exists",
            }, { status: 400 })
        }


        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const uid = genID()


        const User = new user(
            {
                UID: +uid,
                fullName: fullName,
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

