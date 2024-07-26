"use client";
import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from '../auth.module.css';
import toast from 'react-hot-toast';
import axios from 'axios';

type FormData = {
    email_or_username: string;
    otp: string;
    password: string;
    confirmPassword: string;
};

const ForgetPasswordComponent = () => {


    const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
    const SECRET = useRef<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();



    const countDownOTPexpiration = () => {

        setCount(0)  // for safety
        let num = 0
        const cancelInterval = setInterval(() => {
            setCount(num++)

            if (num === 300) {

                clearInterval(cancelInterval)

            }

        }, 1000)

    }



    const onVerifyEmail: SubmitHandler<FormData> = async (data) => {

        try {

            setLoading(true)
            const response = await axios.post('/API/forgetPassword/verifyEmail', { email_or_username: data.email_or_username })
            SECRET.current = response.data.secret
            toast.success(response.data.message);
            setStep('otp');
            setLoading(false)

        } catch (error: any) {

            toast.error(error.response.data.message)
            setLoading(false)

        }
    };





    const onOtp: SubmitHandler<FormData> = async (data) => {
        try {

            setLoading(true)
            // const response = await axios.post('/API/forgetPassword/verifyOTP', { secret: SECRET.current, OTP: data.otp })

            // setStep('password')

            countDownOTPexpiration()

            // toast.success(response.data.message)
            setLoading(false)

        } catch (error: any) {

            toast.error(error.response.data.message)
            setLoading(false)

        }
    };





    const onResetPassword: SubmitHandler<FormData> = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {

            setLoading(true)
            const response = await axios.put('/API/forgetPassword/resetPassword', { email_or_username: data.email_or_username, password: data.password })
            toast.success(response.data.message)
            reset();
            setStep('email');
            setLoading(false)

        } catch (err: any) {

            toast.error(err.response.data.message)
            setLoading(false)

        }

    };






    const handleFormSubmit = step === 'email' ? onVerifyEmail : step === 'otp' ? onOtp : onResetPassword;

    return (

        <form className="container-fluid" onSubmit={handleSubmit(handleFormSubmit)}>

            <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                <div className={`pt-4 pb-3 px-3 ${style.form}`}>
                    <section className='text-center'>
                        <p className='fs-3 fw-bolder'>Reset Password</p>
                        <p className='text-secondary'>Enter your credentials carefully and correctly to reset your password successfully.</p>
                    </section>

                    {/* Email Field */}
                    {step === 'email' && (
                        <div className="mb-3">

                            <label htmlFor="email">email or username</label>
                            <input type="text" id="email" className="form-control"
                                {
                                ...register('email_or_username',
                                    {
                                        required: { value: true, message: 'Required Field!' }
                                    })
                                }

                            />

                            <p className="text-danger">{errors.email_or_username?.message}</p>

                            <button type="submit" className='btn btn-danger w-100 mt-3'>
                                {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                    :
                                    'Continue'
                                }
                            </button>

                        </div>
                    )}



                    {/* OTP Field */}
                    {step === 'otp' && (
                        <div className="mb-3">

                            <label htmlFor="otp">OTP</label>
                            <input type="text" id="otp" className="form-control" {...register('otp', { required: 'OTP is required' })} />
                            {errors.otp && <p className="text-danger">{errors.otp.message}</p>}

                            {count === 300 ?

                                <p className='text-end text-danger'>otp expired!</p>
                                :
                                <p className='text-end mt-2'>{count}</p>}

                            <button type="submit" className='btn btn-danger w-100 '>
                                {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                    :
                                    'Continue'
                                }
                            </button>

                        </div>
                    )}



                    {/* Password Fields */}

                    {step === 'password' && (
                        <>
                            <div className='my-3'>
                                <label htmlFor="Password">Password</label>
                                <input type="password" id="Password" className="form-control"
                                    {...register('password',
                                        {
                                            required: 'Password is required',
                                            maxLength: { value: 12, message: "Max length 12" },
                                            minLength: { value: 8, message: "min length 8" }
                                        },

                                    )}

                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                            </div>


                            <div>

                                <label htmlFor="Confirm_Password">Confirm Password</label>
                                <input type="password" id="Confirm_Password" className="form-control" {...register('confirmPassword',
                                    {
                                        required: 'Confirm Password is required',
                                        maxLength: { value: 12, message: "Max length 12" },
                                        minLength: { value: 8, message: "min length 8" }
                                    }
                                )} />
                                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                                <button type="submit" className='btn btn-danger w-100 my-3'>
                                    {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                        :
                                        'Reset Password'
                                    }
                                </button>

                            </div>

                        </>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ForgetPasswordComponent;
