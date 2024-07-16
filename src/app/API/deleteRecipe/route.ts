import connect from "@/dbConfig/dbConfig";
import cloudinary from "@/helpers/cloudinary/clodinary_config";
import { recipes } from "@/model/recipeSchema";
import { NextRequest, NextResponse } from "next/server";

connect();

export const DELETE = async (req: NextRequest) => {

    try {

        const { searchParams } = new URL(req.url)

        const id = searchParams.get('id')
        const p_id = searchParams.get('p_id')

        await recipes.findByIdAndDelete(id)
        
        await cloudinary.uploader.destroy(p_id!)
        
        return NextResponse.json({
            message: 'Recipe deleted successfully',
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Error deleting recipe',
        })
    }

}