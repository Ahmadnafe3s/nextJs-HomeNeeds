import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {

    const response = NextResponse.json({
      message: 'User logged out.'
    })

    response.cookies.delete('token')

    return response

  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong.'
    })
  }

}