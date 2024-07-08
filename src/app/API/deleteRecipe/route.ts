import connect from "@/dbConfig/dbConfig";
import { recipes } from "@/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";

connect();

export const DELETE = async (req: NextRequest) => {

    try {

        const { searchParams } = new URL(req.url)

        const id = searchParams.get('id')
        
        await recipes.findByIdAndDelete(id)

        return NextResponse.json({
            message: 'Recipe deleted successfully',
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Error deleting recipe',
        })
    }

}