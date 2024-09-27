import connect from "@/dbConfig/dbConfig";
import users from "@/model/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

await connect();


export const POST = async (req: NextRequest) => {
    try {

        const data = await req.json()

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(data.password, salt)

        await users.updateOne({ username: data.username }, { $set: { password: hashedPassword } })

        return NextResponse.json({
            message: "Password have been Changed",
        })

    } catch (error: any) {
        return NextResponse.json({
            message: "Somthing went wrong.",
        }, { status: 400 })
    }
}