
type fieldType = 'heading' | 'Text'

export type detailsField = {
    heading?: string,
    text?: string,
    Type: fieldType
}

export type ingredientsField = {
    Ingredient: string,
    Amount: string
}

export type recipeType = {
    _id?: string,
    Name: string,
    Description: string,
    RecipeImage: File | any,
    Category: string,
    Details: detailsField[],
    Ingredients: ingredientsField[]
}



export type recipesListResponseType = {
    _id?: string,
    FID: string,
    Name: string,
    Description: string,
    RecipeImage: { url: string, public_id: string },
    Category: string,
    Details: detailsField[],
    Ingredients: ingredientsField[]
}




