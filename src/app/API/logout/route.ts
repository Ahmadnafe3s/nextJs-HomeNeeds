import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {

    const response = NextResponse.json({
      message: 'User logged out.'
    })

    response.cookies.set('token', '',
      {
        expires: new Date(0),
        secure : true,
        httpOnly: true,
        path: '/',
        sameSite : 'lax',
      })

    return response

  } catch (error) {
    return NextResponse.json({
      message: 'Something went wrong.'
    })
  }

}