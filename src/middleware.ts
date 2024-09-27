import { auth } from '@/auth'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";


export default auth(async (req : NextRequest) => {

    const Path = req.nextUrl.pathname

    const isNotpublicPath = Path === '/recipe_form' || Path === '/profile' || Path === '/auth/changePassword';
    const isAuthPath = Path === '/logIn' || Path == '/signUp'

     const Token = await getToken({ req, secret: process.env.AUTH_SECRET! });

     console.log('Token:', Token);

    if (isNotpublicPath && !Token) {
        return NextResponse.redirect(new URL('/logIn', req.url))
    }

    if (Token && isAuthPath) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()

})


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}