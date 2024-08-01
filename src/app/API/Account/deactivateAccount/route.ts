import connect from "@/dbConfig/dbConfig";
import users from "@/model/userSchema";
import { recipes } from "@/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";

connect();


export const POST = async (req: NextRequest) => {
    try {

        const data = await req.json()

        await users.deleteOne({ username: data.username })
        await recipes.deleteMany({ FID: data.username })

        const response = NextResponse.json({
            message: 'Account Deactivated.'
        })

        response.cookies.set('token', '', { expires: new Date(0), httpOnly: true })

        return response;

    } catch (error) {

        return NextResponse.json({
            message: 'Something went wrong!'
        }, { status: 400 })

    }
}