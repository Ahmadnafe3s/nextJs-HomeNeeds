import { NextRequest, NextResponse } from 'next/server'
import { recipes } from '../../../model/recipeSchema'
import connect from '@/dbConfig/dbConfig'

await connect();

export const GET = async (req: NextRequest) => {

    try {

        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get('page')) || 1    //if nothig come then default 1
        const Limit = Number(searchParams.get('limit')) || 12
        
        const Skip = (page - 1) * Limit   // (1 - 1) + 12 = 0 , (2 - 1) * 12 = 12 

        const pipeline = [{ $count: "total_items" }];
        const recipesList = await recipes.find().skip(Skip).limit(Limit).sort({ _id: -1 }) // skip will skip n number of docs if 12 then 12 , limit returns n number of docs.
        const Total_Items = await recipes.aggregate(pipeline)

        return NextResponse.json({
            Recipe_List: recipesList,
            total_items: Total_Items[0].total_items
        })

    } catch (error: any) {

        return NextResponse.json({
            message: error.message
        }, { status: 404 })

    }

}