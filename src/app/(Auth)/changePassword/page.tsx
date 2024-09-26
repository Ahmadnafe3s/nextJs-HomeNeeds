"use client"
import React, { Suspense, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import style from '../auth.module.css'
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';

type Form = {
    password: string,
    confirmPassword: string
};

const ChangePassword = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>();
    const user = useSearchParams().get('user')
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Form> = async (data) => {
        try {

            if (data.password !== data.confirmPassword) {
                toast.error('Password did not match')
                return null
            }
            setLoading(true)

            const response = await axios.post('/api/Account/changePassword', { username: user, password: data.password })

            toast.success(response.data.message)
            setLoading(false)
            reset()
            router.back()

        } catch (error: any) {

            toast.error(error.response.data.message)
            setLoading(false)

        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>

                <div className={`py-4 px-3 ${style.form}`}>

                    <p className='fs-3 fw-bolder text-center'>Change Password</p>

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


                    <div className='my-3'>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" className="form-control"
                            {...register('confirmPassword',
                                {
                                    required: 'Confirm Password is required',
                                    maxLength: { value: 12, message: "Max length 12" },
                                    minLength: { value: 8, message: "min length 8" }
                                },

                            )}

                        />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className='btn btn-success w-100'>
                        {loading ? <div className="spinner-border spinner-border-sm text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                            :
                            'Change Password'
                        }
                    </button>

                </div>
            </div>
        </form>
    )
}



export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ChangePassword />
      </Suspense>
    );
  }