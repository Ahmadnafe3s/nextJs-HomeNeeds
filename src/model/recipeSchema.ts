import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    Category: {
        type: String,
        require: true
    },

    RecipeImage: {
        type: Object,
        required: true
    },


    Details: [
        {
            heading: {
                type: String
            },

            Text: {
                type: String
            }
        },
        { require: true }
    ],


    Ingredients: [
        {
            Ingredient: {
                type: String
            },

            Amount: {
                type: String
            }
        },

        { require: true }
    ],


    FID: {
        type: String,
        require: true,
    }

}, { versionKey: false })


export const recipes = mongoose.models.recipes || mongoose.model('recipes', recipeSchema)