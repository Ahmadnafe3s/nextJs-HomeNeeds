"use client"
import { setUser } from '@/Store/Slice/userSlice'
import { useAppDispatch } from '@/Store/hooks/hooks'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next-nprogress-bar'
import style from '../auth.module.css'
import LoadinSpinner_2 from '@/app/components/loadingSpinner-2/loadingSpinner-2'

const logInComponent = () => {

    const dispatchUser = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    type Inputs = {
        email_or_username: string,
        password: string | number
    }

    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>()

    const onSubmit = async (data: Inputs) => {

        try {
            setLoading(true)
            const Response = await axios.post('/API/Account/logIn', data)

            toast.success(Response.data.message)

            const user = {
                UID: Response.data.UID,
                userName: Response.data.userName,
                email: Response.data.email,
            }

            dispatchUser(setUser(user))
            setLoading(false)
            router.push('/')

        } catch (error: any) {

            setLoading(false)
            toast.error(error.response.data.message)
            
        }
    }


    return (
        <>

            <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>

                    <div className={` pt-4 pb-3 px-3 ${style.form}`}>

                        <section className='text-center'>
                            <p className='fs-3 fw-bolder'>Log In</p>
                            <p className='text-secondary'>Welcome! to your account.</p>
                        </section>



                        {/* Email Field */}

                        <div className="mb-3">
                            <label htmlFor="email">Email or Username</label>
                            <input type="text" id="email" className="form-control" placeholder="email or username"
                                {
                                ...register('email_or_username',
                                    {
                                        required: { value: true, message: 'Required Field!' }
                                    })
                                } />
                            <p className="text-secondary">{errors.email_or_username?.message}</p>
                        </div>



                        {/* This is Password field */}

                        <div>

                            <label htmlFor="Password">Password</label>

                            <input type="password" id="Password" className="form-control" placeholder="Password"

                                {...register('password',
                                    {
                                        required: { value: true, message: 'Required Field!' },
                                        minLength: { value: 8, message: 'Min length 8' },
                                        maxLength: { value: 12, message: 'Max length 12' }
                                    })} />

                            <p className="text-secondary">{errors.password?.message}</p>
                        </div>



                        {/* forget password button */}

                        <div className="text-end mt-2">
                            <a className="link-primary" href="forget-password">forget password</a>
                        </div>


                        <br />


                        {/* submit button  */}
                        <button type="submit" className="btn btn-success w-100">
                            {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                                :
                                'Log In'
                            }
                        </button>


                        {/* switch log mode  */}
                        <div className="mt-3 text-center">

                            <Link href="/auth/signUp" className='text-decoration-none text-dark'>Go to <span className='text-primary fw-bolder'>Sign Up</span></Link>

                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}

export default logInComponent 