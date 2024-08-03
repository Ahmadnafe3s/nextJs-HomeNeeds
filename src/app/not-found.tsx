"use client"
import React from 'react'
import not_found_img from '../../public/Images/404.svg'
import Image from 'next/image'
import Link from 'next/link'
import { RevealList } from 'next-reveal'

const NotFound = () => {
    return (
        <>
            <div className="container">
                <RevealList delay={300} interval={200} duration={500} reset={false} scale={1.1} className="row pb-4 pb-md-0">
                    <div className='not-found-img-container'>
                        <Image src={not_found_img} style={{ height: '100%', width: '100%' }} alt='' />
                    </div>
                    <div>
                        <p className='text-secondary text-center'>
                            The page your are trying to visit is not found please click the button to go homepage.
                        </p>
                    </div>
                    <div className='text-center'>
                        <Link href={'/'} className='theame_dark'>Home</Link>
                    </div>
                </RevealList>
            </div>
        </>
    )
}

export default NotFound