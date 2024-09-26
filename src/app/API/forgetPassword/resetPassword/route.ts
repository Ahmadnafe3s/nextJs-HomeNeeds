import connect from "@/dbConfig/dbConfig";
import users from "@/model/userSchema";
import bcrypt from 'bcryptjs'

import { NextRequest, NextResponse } from "next/server";

await connect();


export const PUT = async (req: NextRequest) => {

    try {

        const { email_or_username, password } = await req.json()

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        await users.updateOne({ $or: [{ email: email_or_username }, { username: email_or_username }] }, { $set: { password: hashedPassword } })

        return NextResponse.json({
            message: 'Password have been reset.'
        })


    } catch (error: any) {

        return NextResponse.json({
            message: error.message
        }, { status: 400 })

    }

}