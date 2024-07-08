import { NextRequest, NextResponse } from 'next/server'
import { recipes } from '../../../../model/recipeSchema'
import connect from '@/dbConfig/dbConfig'

connect(); // was forget to call

export const GET = async (req: NextRequest, { params }: any) => {

    try {

        const Details = await recipes.findById({ _id: params.id })

        return NextResponse.json({
            recipe_Details: Details,
        })

    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 404 })

    }

}