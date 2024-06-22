import { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {

}

export const config = {
    matcher: [
        '/',
        '/logIn',
        '/signUp',
        '/upsert-ingredient',
        '/upsert-recipe',
        '/recipe_list',
        '/shopping_list'
    ]
}