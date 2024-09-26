import connect from "@/dbConfig/dbConfig";
import { recipes } from "@/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";

await connect();

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {

    try {
        const Recipe = await req.json()
        const ID = params.id

        await recipes.findByIdAndUpdate({ _id: ID }).set(Recipe) // only certian parts will be updated

        return NextResponse.json({
            message: "Recipe updated.",
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 400 })
    }
} 