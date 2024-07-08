import connect from "@/dbConfig/dbConfig"
import { recipes } from "@/model/recipeSchema"
import { NextRequest, NextResponse } from "next/server"

connect()

export const GET = async (req: NextRequest) => {

    try {
        
        const { searchParams } = await new URL(req.url)

        const searchedValue = searchParams.get('search')


        const recipe_list = await recipes.aggregate([  // it is more efficient than text index evalutaes data query in pipeline within the docs
            {
                $search: {   // operator  
                    index: 'search', // Name of the Atlas Search index
                    text: {
                        query: searchedValue,  // The search term
                        path: {
                            wildcard: '*' // Search in all fields
                        }
                    }
                }
            }
        ]).exec();

        return NextResponse.json({
            Recipe_List: recipe_list,
        })


    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 400 })
    }

}