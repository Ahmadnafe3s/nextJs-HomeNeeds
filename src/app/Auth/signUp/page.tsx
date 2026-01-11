"use client";

import axios from 'axios'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import style from '../auth.module.css'
import { useRef, useState } from 'react';
import { useRouter } from 'next-nprogress-bar';



type Inputs = {
    username: string,
    email: string,
    password: string | number,
    OTP: string
}


const SignupComponent = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const [step, setStep] = useState<'signUp' | 'OTP'>('signUp')
    const secret = useRef<any>(null)


    const { register, handleSubmit, watch, formState: { errors }, } = useForm<Inputs>()


    const onSubmit = async (formData: Inputs) => {
        try {
            setLoading(true)
            const Response = await axios.post('/api/Account/userEmailVerification', { email: formData.email, username: formData.username })
            secret.current = Response.data.secret
            toast.success(Response.data.message)
            setStep('OTP')

        } catch (error: any) {
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)

        }
    }



    const verifyOTP: SubmitHandler<Inputs> = async (formData) => {

        try {
            setLoading(true)

            const Response = await axios.post('/api/Account/signUp', { ...formData, secret: secret.current })

            toast.success(Response.data.message)
            router.push('/logIn')

        } catch (error: any) {

            toast.error(error.response.data.message)

        } finally {

            setLoading(false)

        }
    }



    const handleFormSubmit = step === 'signUp' ? onSubmit : verifyOTP


    return (
        <>

            <form className="container-fluid" onSubmit={handleSubmit(handleFormSubmit)}>

                <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>

                    <div className={`${style.form} py-4 px-3`}>

                        <section className='text-center'>
                            <p className='fs-3 fw-bolder'>Sign Up</p>
                            <p className='text-secondary'>Create a free account with email.</p>
                        </section>

                        {step === 'signUp' &&

                            <>

                                {/* Full Name Field */}

                                <div className="mb-3">

                                    <label htmlFor="username">Username</label>

                                    <input type="text" id="username" className="form-control" placeholder="username"

                                        {
                                        ...register('username',
                                            {
                                                required: { value: true, message: 'Required Field!' }
                                                , maxLength: { value: 15, message: 'Max length 12' },
                                                pattern: { value: /^[a-z0-9_]*$/, message: 'Username can only contain lowercase letters, numbers, and underscores' },
                                            })
                                        } />


                                    <p className="text-secondary">{errors.username?.message}</p>
                                </div>




                                {/* Email Field */}

                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" className="form-control" placeholder="example@gmail.com"
                                        {
                                        ...register('email',
                                            {
                                                required: { value: true, message: 'Required Field!' },
                                                pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Enter valid email!' }
                                            })
                                        } />
                                    <p className="text-secondary">{errors.email?.message}</p>
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



                                {/* submit button  */}
                                <button type="submit" className="btn btn-success w-100">
                                    {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                        :
                                        'Sign Up'
                                    }
                                </button>

                            </>
                        }



                        {/* This is OTP field */}

                        {step === 'OTP' &&
                            <>
                                <div>

                                    <label htmlFor="OTP">OTP</label>

                                    <input type="number" id="OTP" className="form-control"

                                        {...register('OTP',
                                            {
                                                required: { value: true, message: 'Required Field!' },
                                                minLength: { value: 6, message: 'min length is 6' }
                                            })} />

                                    <p className="text-secondary">{errors.OTP?.message}</p>
                                </div>


                                {/* verify OTP button  */}

                                <button type="submit" className="btn btn-success w-100">
                                    {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                        :
                                        'Verify OTP'
                                    }
                                </button>

                            </>
                        }



                        {/* switch log mode  */}
                        <div className="mt-3 text-center">

                            <Link className="text-decoration-none text-dark" href="/logIn">Already have an account visit <span className=' fw-bolder text-primary ms-1'>Log In</span></Link>

                        </div>


                    </div>
                </div>
            </form >
        </>
    )
}

export default SignupComponent