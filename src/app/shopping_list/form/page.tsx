"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shopping_list_type } from '../listType'
import { heading_font } from '../../../../public/fonts/fonts'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

const page = () => {

    const params = useSearchParams()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<shopping_list_type>()
    const [editMode, setEditmode] = useState<string | null>(params.get('id'))
    const index = useRef<number>(+params.get('id')!) // did for naming convention


    useEffect(() => {

        const shopping_list = JSON.parse(localStorage.getItem('next-shopping')!) || []

        if (editMode && shopping_list.length > 0) {
            setValue('Ingredient', shopping_list[index.current].Ingredient)
            setValue('Amount', shopping_list[index.current].Amount)
        }

    }, [])



    const onSubmit = (data: shopping_list_type) => {

        const shopping_list = JSON.parse(localStorage.getItem('next-shopping')!) || []

        if (editMode) {

            shopping_list[index.current] = data
            localStorage.setItem('next-shopping', JSON.stringify(shopping_list))
            toast.success('Updated Successfully');
            setEditmode(null);

        } else {

            shopping_list.push(data);
            localStorage.setItem('next-shopping', JSON.stringify(shopping_list))
            toast.success('Ingredient Added.')

        }

        reset()
    }

    const onReset = () => {
        reset()
        setEditmode(null)
    }


    return (
        <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>

            <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>

                <div className="col-md-5 col-lg-3 col-10 bg-white pt-4 pb-4 px-3 ">

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


                    {/* Ingredient Field */}

                    <div className="mb-3">
                        <label htmlFor="Ingredient">Ingredient</label>
                        <input type="text" id="Ingredient" className="form-control" placeholder="Ingredient"
                            {
                            ...register('Ingredient',
                                {
                                    required: { value: true, message: 'Required Field!' },
                                })
                            } />
                        <p className="text-secondary">{errors.Ingredient?.message}</p>
                    </div>



                    {/* This is Amount field */}


                    <div>

                        <label htmlFor="Amount">Amount</label>

                        <input type="text" id="Amount" className="form-control" placeholder="Amount"

                            {...register('Amount',
                                {
                                    required: { value: true, message: 'Required Field!' },
                                    maxLength: { value: 12, message: 'Max length 12' },
                                })} />

                        <p className="text-secondary">{errors.Amount?.message}</p>
                    </div>

                    <br />


                    {/* submit button  */}
                    <button type="submit" className="btn btn-primary w-100">{editMode ? 'Update' : 'Submit'}</button>
                    <div className='text-center mt-3'>
                        <a className='link-danger fw-medium' style={{cursor : 'pointer'}} onClick={onReset}>Reset</a>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default page