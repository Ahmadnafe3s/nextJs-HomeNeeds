"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next-nprogress-bar'
import style from '../auth.module.css'
import { handleCredentialsSingnIn } from '@/app/Actions/authAction'
import { useSession } from 'next-auth/react'


export type loginFormInputs = {
    email_or_username: string,
    password: string | number
}

const LogInComponent = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { update } = useSession();



    const { register, handleSubmit, formState: { errors }, } = useForm<loginFormInputs>()


    const onSubmit = async (formData: loginFormInputs) => {

        setLoading(true)

        const error = await handleCredentialsSingnIn(formData)

        if (!error) {
            toast.success('Login Successfully')
            await update()
            router.push('/')
        } else {
            toast.error(error as any)
        }
        setLoading(false)
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



                        {/* Email_or_username Field */}

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
                            <Link className="link-primary" href="/forgetPassword">forget password</Link>
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

                            <Link href="/signUp" className='text-decoration-none text-secondary'>Don&apos;t have account visit <span className='text-primary fw-bolder ms-1'> Sign Up</span></Link>

                        </div>

                    </div>

                </div>
            </form>
        </>
    )
}

export default LogInComponent 