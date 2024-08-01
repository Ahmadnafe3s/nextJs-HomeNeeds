"use client"

import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { heading_font } from '../../../../public/fonts/fonts'
import { recipesListResponseType, recipeType } from '../Types/recipeType'
import axios from 'axios'
import upload_image from '@/helpers/cloudinary/uplaod-images'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'


const RecipeForm = () => {

    const { register, handleSubmit, formState: { errors }, control, reset, watch, setValue } = useForm<recipeType>()

    // this arrayField handling Details fields
    const { fields: detailsField, append: appendDetails, remove: removeDetails } = useFieldArray({ name: 'Details', control })

    // this arrayField handling Ingredients fields
    const { fields: IngredientsField, append: appendIngredients, remove: removeIngredients } = useFieldArray({ name: 'Ingredients', control })

    //  append: appendIngredients it is custom Name or alias that is differentiating both appends. or other things
    //  remove: removeIngredients it is custom Name or alias that is differentiating both removes.

    const Param = useSearchParams()
    const preventRecall = useRef<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [editMode, setEditmode] = useState<boolean>(!!Param.get('id'));
    const ID = useRef<string | null>(Param.get('id'))
    const ImageData = useRef<any>(null)

    const bindDataToform = async () => {
        try {
            setLoading(true)
            const ResData = await axios.get<{ recipe_Details: recipesListResponseType }>(`API/getRecipeDetails/${ID.current}`)
            const DETAILS = ResData.data.recipe_Details
            setValue('Name', DETAILS.Name)
            setValue('Description', DETAILS.Description)
            setValue('Category', DETAILS.Category)
            setValue('RecipeImage', DETAILS.Category)
            ImageData.current = DETAILS.RecipeImage

            // binding Heading and text fields

            for (const elem of DETAILS.Details) {
                if (elem.Type === 'Text') {
                    appendDetails({ Type: elem.Type, text: elem.text })
                }

                if (elem.Type === 'heading') {
                    appendDetails({ Type: elem.Type, heading: elem.heading })
                }
            }

            // binding Ingredients fields

            for (const elem of DETAILS.Ingredients) {
                appendIngredients(elem)
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }




    useEffect(() => {
        if (preventRecall.current) return

        if (editMode) {
            bindDataToform()
        }

        preventRecall.current = true
    }, [])





    const postRecipe = async (formData: recipeType) => {
        try {

            setLoading(true)

            // Only will upload image when input fiels will have value.

            if (formData.RecipeImage.length > 0) {
                const Image: any = await upload_image(formData.RecipeImage[0] as unknown as File) // returning a promise

                const { public_id, url } = Image.data // Destructuring or extracting data

                formData.RecipeImage = { public_id , url } as unknown as any // updating field or modifing

            }


            const Response = await axios.post('/API/insert-recipes', formData)

            toast.success(Response.data.message)

            setLoading(false)
            onReset()

        } catch (error: any) {

            toast.error(error.response.data.message)
            setLoading(false)
        }
    }



    const updateRecipe = async (formData: recipeType) => {
        try {

            setLoading(true)

            if (formData.RecipeImage.length === 0) {
                formData.RecipeImage = ImageData.current
            } else {
                const Image: any = await upload_image(formData.RecipeImage[0] as unknown as File) // returning a promise
                const { public_id ,  url } = Image.data // Destructuring or extracting data
                formData.RecipeImage = { public_id, url } as unknown as any // updating field or modifing

            }

            const Response = await axios.put(`/API/updateRecipe/${ID.current}`, formData)

            toast.success(Response.data.message)
            setLoading(false)
            onReset()
        } catch (error: any) {
            toast.error(error.response.data.message)
            setLoading(false)
        }


    }


    const onSubmit = (data: recipeType) => {

        if (editMode) {
            updateRecipe(data)
        } else {
            postRecipe(data);
        }
    }


    const onReset = () => {
        reset()
        removeDetails()
        removeIngredients()
        setEditmode(false)
    }



    const validateFileSize = (file: any) => {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file[0] && file[0].size > maxSize) {
            return "File size exceeds 5MB!";
        }
        return true;
    };


    const demo = async () => {
        const res = await axios.delete(`/API/deleteImage?p_id=${ImageData.current.public_id}`)
        console.log(res.data);
    }

    return (
        <>

            <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center align-items-center py-5" style={{ minHeight: '90vh' }}>

                    <div className="col-md-6 col-11 bg-white p-4 ">

                        <section className='text-center'>

                            <p className={`fs-3 fw-bolder ${heading_font.className}`}>{editMode ? 'Update Recipe' : 'Post Recipe'}</p>

                            <p className='text-secondary'>
                                Post your own recipe to world to show magic of your recipe.
                            </p>

                        </section>


                        {/* Name Field */}

                        <div className="mb-3">
                            <label htmlFor="Name">Name</label>
                            <input type="text" id="Name" className="form-control" placeholder="Name"
                                {
                                ...register('Name',
                                    {
                                        required: { value: true, message: 'Name is Required!' },
                                        maxLength: { value: 20, message: 'Max length 15' },
                                    })
                                } />
                            <p className="text-secondary">{errors.Name?.message}</p>
                        </div>



                        {/* Description Field */}

                        <div className="mb-3">
                            <label htmlFor="Description">Description</label>
                            <input type="text" id="Description" className="form-control" placeholder="Description"
                                {
                                ...register('Description',
                                    {
                                        required: { value: true, message: 'Required Field!' },
                                        maxLength: { value: 100, message: 'Max length 100' },
                                    })
                                } />
                            <p className="text-secondary">{errors.Description?.message}</p>
                        </div>



                        {/* Description Field */}


                        <div className='my-3'>
                            <label htmlFor="Category">Category</label>
                            <select id="" className='form-control' {...register('Category', { required: { value: true, message: 'Please select category' } })}>
                                <option value="">Choose Category</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                                <option value="break fast">Breakfast</option>
                                <option value="fast food">Fast Food</option>
                            </select>

                            <p className="text-secondary">{errors.Category?.message}</p>
                        </div>



                        {/* RecipeImage Field */}

                        <div className="mb-3">
                            <label htmlFor="RecipeImage">RecipeImage</label>
                            <input type="file" id="RecipeImage" className="form-control" placeholder="RecipeImage" accept='image/*'
                                {
                                ...register('RecipeImage',
                                    {
                                        validate: validateFileSize
                                    })
                                }
                            />
                            <p className="text-secondary">{errors.RecipeImage?.message as unknown as string}</p>

                        </div>



                        {/* Details section */}

                        <div className="mb-3">
                            <label className='mb-2'>Recipe Details</label>

                            {detailsField.map((field, index) => {

                                return (

                                    <div key={field.id}>

                                        {field.Type === 'heading' && (

                                            <section className='row justify-content-center'>

                                                <div className='col-10'>
                                                    <input
                                                        type="text"
                                                        id="Heading"
                                                        className="form-control border-3 fw-bold border-bottom border-top-0 border-start-0 rounded-bottom-0 border-end-0"
                                                        placeholder="Heading"
                                                        {...register(`Details.${index}.heading` as any, {
                                                            required: { value: true, message: 'Required Field!' },
                                                        })}
                                                    />
                                                </div>

                                                {/* delete button */}

                                                <div className='col-1 fs-4 mt-3'>
                                                    <i className='bx bx-x-circle' style={{ cursor: 'pointer' }} onClick={() => { removeDetails(index) }}></i>
                                                </div>

                                                <p className="text-secondary col-11">{errors.Details?.[index]?.heading?.message}</p>

                                            </section>

                                        )}


                                        {field.Type === 'Text' && (

                                            <section className='row justify-content-center'>

                                                <div className='col-10'>
                                                    <textarea
                                                        id="Text"
                                                        className="form-control"
                                                        rows={3}
                                                        placeholder="Enter recipe details"
                                                        {...register(`Details.${index}.text` as any, {
                                                            required: { value: true, message: 'Required Field!' },
                                                        })}
                                                    />
                                                </div>

                                                {/* delete button */}
                                                <div className='col-1 fs-4 mt-4'>
                                                    <i className='bx bx-x-circle' style={{ cursor: 'pointer' }} onClick={() => { removeDetails(index) }}></i>
                                                </div>

                                                <p className="text-secondary col-11">{errors.Details?.[index]?.text?.message}</p>


                                            </section>

                                        )}

                                    </div>
                                );
                            })}
                        </div>



                        {/* Details Options Button */}

                        <div className='border col-11 col-md-5 border-2 border-success px-2 py-2 mx-auto text-center'>

                            {/* Button to add headings */}
                            <a className='link-success fw-bold'
                                onClick={() => { appendDetails({ Type: 'heading', heading: '' }) }}
                            >Heading
                            </a>


                            <span className="mx-2">|</span>


                            {/* Button to add Tetxs */}
                            <a className='link-success fw-bold'
                                onClick={() => { appendDetails({ Type: 'Text', text: '' }) }}
                            >Text
                            </a>

                        </div>


                        <br />



                        {/* Ingredients field */}

                        <section className='mt-3'>

                            {IngredientsField.map((field, index) => {

                                return (

                                    <section key={field.id} >


                                        <div className="row">

                                            {/* Ingredient Field */}
                                            <div className='col-7'>
                                                <label htmlFor="Ingredient">Ingredient</label>

                                                <input type="text" id="Ingredient" className="form-control" placeholder="Ingredient"

                                                    {...register(`Ingredients.${index}.Ingredient`,
                                                        {
                                                            required: { value: true, message: 'Required Field!' },
                                                            maxLength: { value: 15, message: 'Max length 10' },
                                                        })} />

                                                <p className="text-secondary">{errors.Ingredients?.[index]?.Ingredient?.message}</p>

                                            </div>


                                            {/*Amount Field*/}

                                            <div className='col-5'>

                                                <label htmlFor="Amount">Amount</label>

                                                <input type="text" id="Amount" className="form-control" placeholder="Amount"

                                                    {...register(`Ingredients.${index}.Amount`,
                                                        {
                                                            required: { value: true, message: 'Required Field!' },
                                                            maxLength: { value: 12, message: 'Max length 12' },
                                                        })} />

                                                <p className="text-secondary">{errors.Ingredients?.[index]?.Amount?.message}</p>

                                            </div>

                                        </div>


                                        {/* Button for removing Ingredient fields */}

                                        <div className="text-end mb-2">
                                            <a className=' link-danger fw-medium' onClick={() => { removeIngredients(index) }}>Delete</a>
                                        </div>

                                    </section>

                                )
                            })}
                        </section>

                        {/* button for adding ingredients */}

                        <div className='my-3'>
                            <a className="link-success fw-bold" onClick={() => appendIngredients({ Ingredient: '', Amount: '' })}>Add Ingredients</a>
                        </div>

                        <br />


                        {/* submit button  */}
                        <button type="submit" className="btn btn-success w-100">
                            {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                                :
                                editMode ? 'Update' : 'Submit'
                            }

                        </button>

                        {/* reset button */}
                        <div className='text-center mt-3'>
                            <a className='link-danger fw-medium' onClick={onReset}>Reset</a>
                        </div>
                    </div>
                </div>
            </form >
        </>
    )
}




export default RecipeForm
