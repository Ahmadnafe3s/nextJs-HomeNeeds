import connect from "@/dbConfig/dbConfig"
import { recipes } from "@/model/recipeSchema"
import { NextRequest, NextResponse } from "next/server"

connect()

export const GET = async (req: NextRequest) => {

    try {

        const { searchParams } = await new URL(req.url)

        const searchedValue = searchParams.get('category')

        const recipe_list = await recipes.find({ Category: searchedValue })


        return NextResponse.json({
            Recipe_List: recipe_list,
        })


    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 400 })
    }

}