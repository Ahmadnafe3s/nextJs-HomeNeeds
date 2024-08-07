import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {

    const response = NextResponse.json({
      message: 'User logged out.'
    })


    response.cookies.set('token', "",
      {
        maxAge : 0,
        httpOnly: true,
        secure : true,
        path : '/',
        sameSite : 'strict'
      }
    )

    return response

  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong.'
    })
  }

}