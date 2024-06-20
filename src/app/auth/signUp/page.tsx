"use client";

import axios from 'axios'
import Link from 'next/link'
import  React  from 'react'
import { useForm } from 'react-hook-form'
import LoadingBar from 'react-top-loading-bar'
import toast from 'react-hot-toast'


const SignupComponent = () => {
    const loadinBarRef = React.useRef<any>(null)
    type Inputs = {
        fullName: string,
        email: string,
        password: string | number
    }


    const { register, handleSubmit, watch, formState: { errors }, } = useForm<Inputs>()

    const onSubmit = async (user: Inputs) => {
        try {

            loadinBarRef.current.continuousStart()
            const Response = await axios.post('../API/Account/signUp', user)
            loadinBarRef.current.complete()
            toast.success(Response.data.message)

        } catch (error: any) {

            loadinBarRef.current.complete()
            toast.error(error.response.data.message)
            
        }
    }

    // wtach gives passed controled value (such as onChange)
    // console.log(watch("fullName"));


    return (
        <>
            {/* Loaading bar */}
            <LoadingBar color="green" ref={loadinBarRef} shadow={true} />

            <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>

                <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>

                    <div className="col-md-5 col-lg-3 col-10 bg-white pt-4 pb-3 px-3 ">

                        <section className='text-center'>
                            <p className='fs-3 fw-bolder'>Sign Up</p>
                            <p className='text-secondary'>Create a free account with email.</p>
                        </section>


                        {/* Full Name Field */}

                        <div className="mb-3">

                            <label htmlFor="fullName">Full Name</label>

                            <input type="text" id="fullName" className="form-control" placeholder="Enter your name"
                                {
                                ...register('fullName',
                                    {
                                        required: { value: true, message: 'Required Field!' }
                                        , maxLength: { value: 12, message: 'Max length 12' }
                                    })
                                } />

                            <p className="text-secondary">{errors.fullName?.message}</p>
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




                        <br />


                        {/* submit button  */}
                        <button type="submit" className="btn btn-success w-100">Sign Up</button>


                        {/* switch log mode  */}
                        <div className="mt-3 text-center">

                            <Link className="text-decoration-none text-dark" href="/auth/logIn">Go to <span className=' fw-bolder text-primary'>Log In</span></Link>

                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}

export default SignupComponent