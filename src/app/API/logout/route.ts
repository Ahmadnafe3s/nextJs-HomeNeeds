import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

  try {

    const response = NextResponse.json({
      message: 'User logged out.'
    })

    // Prevent caching of this response
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    response.cookies.set('token', "",
      {
        maxAge: 0,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
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