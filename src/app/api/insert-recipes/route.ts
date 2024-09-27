import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import { recipes } from "@/model/recipeSchema";
import { getToken } from "next-auth/jwt";

await connect();

export const POST = async (req: NextRequest) => {

    try {

        const recipeData = await req.json()

        const Token = await getToken(
            {
                req,
                secret: process.env.AUTH_SECRET!,
                secureCookie: process.env.NODE_ENV === 'production',
                salt: process.env.NODE_ENV === 'production' ? "__Secure-authjs.session-token" : "authjs.session-token"
            });

        const Recipes = new recipes({ FID: Token?.name, ...recipeData })

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