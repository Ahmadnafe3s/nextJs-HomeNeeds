"use client"

import React from 'react'
import styles from './userModel.module.css'
import { useSession } from 'next-auth/react'
import Link from 'next/link'


const UserModelComponent = ({ logout, closeUserModel }: { logout: any, closeUserModel: any }) => {

    const { data: session } = useSession()



    return (

        <>

        {/* backdrop */}
            <div className={styles.backdrop} onClick={closeUserModel}></div>


            <div className={styles.userModel}>
                {/* LOGO */}

                <div className={`${styles.userModel_logo} mx-auto`}>
                    <p>{session?.user?.name?.charAt(0)}</p>
                </div>

                <div className=' text-center mt-3'>
                    <p className=' display-6 fw-bold mb-1'>{session?.user?.name}</p>
                    <p>{session?.user?.email}</p>
                </div>

                <hr />

                <ul className=' list-unstyled'>
                    <li><Link href={`/profile?user=${session?.user?.name}`} onClick={closeUserModel}>Profile</Link></li>
                    <li><Link href="/recipe_form" onClick={closeUserModel}>Post Recipe</Link></li>
                </ul>

                {/* <hr /> */}

                <div className='text-center mt-4'>
                    <button type="button" className='btn btn-dark w-100' onClick={logout}>Logout</button>
                </div>

            </div>
        </>
    )
}

export default UserModelComponent