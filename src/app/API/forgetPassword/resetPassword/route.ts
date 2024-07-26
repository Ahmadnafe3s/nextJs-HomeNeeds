import connect from "@/dbConfig/dbConfig";
import users from "@/model/userSchema";
import bcrypt from 'bcryptjs'

import { NextRequest, NextResponse } from "next/server";

connect();


export const PUT = async (req: NextRequest) => {

    try {

        const credentials = await req.json()

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(credentials.password, salt)

        await users.updateOne({ $or: [{ email: credentials.email_or_username }, { username: credentials.email_or_username }] }, { $set: { password: hashedPassword } })

        return NextResponse.json({
            message: 'Password been reset.'
        })
        

    } catch (error: any) {

        return NextResponse.json({
            message: error.message
        }, { status: 400 })

    }

}