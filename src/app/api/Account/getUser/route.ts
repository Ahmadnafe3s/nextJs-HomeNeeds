"use server"
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import users from "@/model/userSchema";
import bcrypt from 'bcryptjs'

await connect();

export const POST = async (req: NextRequest) => {

    try {

        const { email_or_username, password } = await req.json()

        const User = await users.findOne({ $or: [{ email: email_or_username }, { username: email_or_username }] })

        if (!User) {
            return NextResponse.json({
                message: 'User not found!'
            }, { status: 400 })
        }

        const isPasswordCorrect = await bcrypt.compare(password as string, User.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({
                message: 'user or password is incorrect!'
            }, { status: 400 })
        }

        return NextResponse.json({
            id: User._id,
            name: User.username,
            email: User.email
        })

    } catch (error) {

        return NextResponse.json({

            message: 'Something went wrong!',

        }, { status: 500 })

    }


}