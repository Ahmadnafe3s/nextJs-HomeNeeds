
type fieldType = 'heading' | 'Text' | 'Image'

export type detailsField = {
    heading?: string,
    Text?: string,
    type?: fieldType
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
    RecipeImage: { URL: string, Asset_ID: string, Public_ID: string },
    Category: string,
    Details: detailsField[],
    Ingredients: ingredientsField[]
}




