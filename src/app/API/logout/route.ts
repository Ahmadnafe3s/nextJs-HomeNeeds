import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {

    const response = NextResponse.json({
      message: 'User logged out.'
    })


    response.cookies.set('token', '',
      {
        expires: new Date(0),
        path: '/',
        secure: true,
        sameSite: 'strict'
      }
    )

    return response

  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong.'
    })
  }

}