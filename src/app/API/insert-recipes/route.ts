import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken"
import { recipes } from "@/model/recipeSchema";


connect();

export const POST = async (req: NextRequest) => {

    try {

        const recipeData = await req.json()
        
        const Token: any = req.cookies.get('token')?.value

        const { username }: any = await jwt.verify(Token, process.env.JWT_TOKEN_SECRET!) // has a username , email , expiration time

        const Recipes = new recipes({ FID: username, ...recipeData })

        await Recipes.save()

        return NextResponse.json({
            message: "Recipe been stored successfully"
        })


    } catch (error: any) {

        return NextResponse.json({
            message: error.message
        }, { status: 400 })

    }
}