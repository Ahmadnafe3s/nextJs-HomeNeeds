"use client"

import axios from 'axios'
import { RevealList, RevealWrapper } from 'next-reveal'
import React, { useEffect, useRef, useState } from 'react'
import style from '../../recipe_list.module.css'
import { recipesListResponseType } from '../../Types/recipeType'
import LoadinSpinner_2 from '@/app/components/loadingSpinner-2/loadingSpinner-2'
import Banner from '../../../components/recipe_components/banner'
import { banner_heading } from '../../../../../public/fonts/fonts'
import toast from 'react-hot-toast'
import Link from 'next/link'


const RecipeDetails = ({ params }: any) => {

    const preventRecall = useRef<boolean>(false)
    const [details, setDetails] = useState<recipesListResponseType | null>(null)

    const fetchRecipeDetails = async () => {
        try {

            const response = await axios.get<{ recipe_Details: recipesListResponseType }>(`/API/getRecipeDetails/${params.id}`)
            setDetails(response.data.recipe_Details)

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {

        if (preventRecall.current) return

        fetchRecipeDetails()

        preventRecall.current = true

    }, [])


    const onSendToshoppingList = () => {

        const ShoppingList = JSON.parse(localStorage.getItem('next-shopping')!) || []

        for (const element of details?.Ingredients!) {
            ShoppingList.push(element)
        }

        localStorage.setItem('next-shopping', JSON.stringify(ShoppingList))

        toast.success('Ingredients have been sent.')

    }

    return (

        <>

            <Banner />

            {/* Detail Info section */}

            <div className="container my-4 py-5">
                <div className="row justify-content-center">

                    <div>
                        <p className=' display-2 mb-md-5 mt-md-3 fw-bold text-center' style={{ color: 'green' }}>Checkout Recipe Details.</p>
                        <p className='text-center'>A balanced mixture of ingredients cooks delicious food.</p>
                    </div>

                    {details ?
                        <div className=" col-12 col-md-10 mt-5">
                            <div>
                                <p className={`display-5 fw-bold text-center ${banner_heading.className}`} style={{ letterSpacing: '5px' }}>{details?.Name}</p>
                                <div className='d-flex align-items-center'>

                                    <i className='bx bx-user-circle fs-2'></i>

                                    <Link href={`/profile?user=${details.FID}`} className=' text-decoration-none fw-bold ms-1'>{details.FID}</Link> {/* username */}
                                </div>
                                <p className='my-2'>Category | <span className='fw-bold text-bg-success badge rounded-end-pill'>{details?.Category}</span></p>

                            </div>

                            <hr />


                            {/* Image section */}

                            <div className={` mx-auto my-5 ${style.details_img_container}`}>
                                <img src={details?.RecipeImage.url} className='img-fluid ' alt="" />
                                <p className=' display-3 text-white'>{details?.Name}</p>
                            </div>

                            <hr />

                            {details?.Details.map((elem, index) => {
                                return (
                                    <div key={index} className='mb-4'>
                                        <p className='fs-5 fw-bold mt-3'>{elem.heading}</p>
                                        <p>{elem.text?.replaceAll(/\n/g, '\n\n' + ' ')}</p>
                                    </div>
                                )
                            })}

                            <hr />



                            {details.Ingredients.length > 0 &&

                                <div className='row justify-content-center mt-3'>

                                    <ol className="list-group list-group-numbered col-11 col-md-7 ">

                                        <p className='fw-bold m-2 fs-6 text-secondary'>Ingredients</p>

                                        {details.Ingredients.map((elem, index) => {
                                            return (
                                                <RevealList delay={100} interval={150} duration={500} reset={false} className="list-group-item bg-transparent d-flex justify-content-between align-items-start" key={index}>
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{elem.Ingredient}</div>
                                                    </div>
                                                    <span className="badge py-2 text-bg-success rounded-pill">{elem.Amount}</span>
                                                </RevealList>
                                            )
                                        })}
                                    </ol>

                                    <div className='col-md-7 mt-3 '>
                                        <a className='link-success text-decoration-none fw-bold' onClick={onSendToshoppingList}>Add to Shopping.</a>
                                    </div>
                                </div>

                            }



                        </div>
                        :

                        <div className='d-grid' style={{ minHeight: '70vh', placeContent: 'center' }}>
                            <LoadinSpinner_2 />
                        </div>

                    }
                </div>
            </div>

        </>
    )
}

export default RecipeDetails