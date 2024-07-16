import connect from "@/dbConfig/dbConfig";
import { recipes } from "@/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";


connect();


export const GET = async (req: NextRequest) => {

    try {
        const { searchParams } = new URL(req.url)
        const user = searchParams.get('user')
        const userProfileData = await recipes.find({ FID: user }, { Name: 1, RecipeImage: 1, _id: 1 }).sort({_id : -1}) // FID is here foreign ID which stores username

        return NextResponse.json({
            userProfileData
        })


    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        })
    }

}