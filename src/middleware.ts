import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {

    const Path =  req.nextUrl.pathname

    const NotpublicPath = Path === '/recipe_form' || Path === '/profile' || Path === '/auth/changePassword';
    const authPath = Path === '/auth/logIn' || Path == '/auth/signUp'

    const Token = req.cookies.get('token')?.value 

    if (NotpublicPath && !Token) {
        return NextResponse.redirect(new URL('/auth/logIn', req.url))
    }

    if (Token && authPath) {
        return NextResponse.redirect(new URL('/', req.url))
    }

}

export const config = {
    matcher: [
        '/',
        '/auth/logIn',
        '/auth/signUp',
        '/auth/changePassword',
        '/profile',
        '/recipe_category',
        '/recipe_details',
        '/recipe_form',
        '/shopping_list',
        '/search_recipe_list'
    ]
}