"use client"

import { useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { heading_font } from '../../../../public/fonts/fonts'
import { recipeType } from '../Types/recipeType'
import axios from 'axios'
import upload_image from '@/helpers/cloudinary/uplaod-images'
import toast from 'react-hot-toast'


const RecipeForm = () => {

    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm<recipeType>()

    // this arrayField handling Details fields
    const { fields: detailsField, append: appendDetails, remove: removeDetails } = useFieldArray({ name: 'Details', control })

    // this arrayField handling Ingredients fields
    const { fields: IngredientsField, append: appendIngredients, remove: removeIngredients } = useFieldArray({ name: 'Ingredients', control })

    //  append: appendIngredients it is custom Name or alias that is differentiating both appends. or other things



    const [editMode, setEditmode] = useState(false);



    const onSubmit = async (data: recipeType) => {

        // Avoiding Type field or filtering out.. 
        const sanitized = data.Details.map((Element) => {
            const { type, ...rest } = Element
            return rest
        });

        try {


            data.Details = sanitized // overriting Details


            const Image = await upload_image(data.RecipeImage[0] as unknown as File) // returning a promise

            const { public_id, asset_id, url } = Image.data // Destructuring or extracting data

            data.RecipeImage = { Public_ID: public_id, Asset_ID: asset_id, URL: url } as unknown as any // updating field or modifing

            const Response = await axios.post('/API/insert-recipes', data)

            toast.success(Response.data.message)


        } catch (error: any) {

            toast.error(error.response.data.message)

        }

    }


    const onReset = () => {
        reset()
        removeDetails()
        removeIngredients()
    }



    const validateFileSize = (file: any) => {
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file[0] && file[0].size > maxSize) {
            return "File size exceeds 5MB!";
        }
        return true;
    };


    return (
        <>

            <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center align-items-center py-5" style={{ minHeight: '90vh' }}>

                    <div className="col-md-6 col-11 bg-white pt-4 pb-4 px-3 ">

                        <section className='text-center'>

                            <p className={`fs-3 fw-bolder ${heading_font.className}`}>{editMode ? 'Update' : 'Ingredient'}</p>

                            <p className='text-secondary'>
                                {editMode ?
                                    'A balanced amount of ingredients makes tasty foods.'
                                    :
                                    'Ingredient are essential for Cooking tasty foods.'
                                }
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
                                        required: { value: true, message: 'Required Field!' },
                                        validate: validateFileSize
                                    })
                                } />
                            <p className="text-secondary">{errors.RecipeImage?.message as unknown as string}</p>

                        </div>



                        {/* Details section */}

                        <div className="mb-3">
                            <label className='mb-2'>Recipe Details</label>

                            {detailsField.map((field, index) => {

                                return (

                                    <div key={field.id}>

                                        {field.type === 'heading' && (

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


                                        {field.type === 'Text' && (

                                            <section className='row justify-content-center'>

                                                <div className='col-10'>
                                                    <textarea
                                                        id="Text"
                                                        className="form-control"
                                                        rows={3}
                                                        placeholder="Enter recipe details"
                                                        {...register(`Details.${index}.Text` as any, {
                                                            required: { value: true, message: 'Required Field!' },
                                                        })}
                                                    />
                                                </div>

                                                {/* delete button */}
                                                <div className='col-1 fs-4 mt-4'>
                                                    <i className='bx bx-x-circle' style={{ cursor: 'pointer' }} onClick={() => { removeDetails(index) }}></i>
                                                </div>

                                                <p className="text-secondary col-11">{errors.Details?.[index]?.Text?.message}</p>


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
                                onClick={() => { appendDetails({ type: 'heading', heading: '' }) }}
                                style={{ cursor: 'pointer' }}
                            >Heading
                            </a>


                            <span className="mx-2">|</span>


                            {/* Button to add Tetxs */}
                            <a className='link-success fw-bold'
                                onClick={() => { appendDetails({ type: 'Text', Text: '' }) }}
                                style={{ cursor: 'pointer' }}
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
                                            <a className=' link-danger fw-medium' style={{ cursor: 'pointer' }} onClick={() => { removeIngredients(index) }}>Delete</a>
                                        </div>

                                    </section>

                                )
                            })}
                        </section>

                        {/* button for adding ingredients */}

                        <div className='my-3'>
                            <a className="link-success fw-bold" style={{ cursor: 'pointer' }} onClick={() => appendIngredients({ Ingredient: '', Amount: '' })}>Add Ingredients</a>
                        </div>

                        <br />


                        {/* submit button  */}
                        <button type="submit" className="btn btn-success w-100">{editMode ? 'Update' : 'Submit'}</button>

                        {/* reset button */}
                        <div className='text-center mt-3'>
                            <a className='link-danger fw-medium' style={{ cursor: 'pointer' }} onClick={onReset}>Reset</a>
                        </div>
                    </div>
                </div>
            </form >
        </>
    )
}

export default RecipeForm