
"use client"

import Image from "next/image"
import hero from "../../../public/images/hero.jpg"
import { heading_font } from "../../../public/fonts/fonts"
import style from "./home.module.css"
import ScrollReveal from 'scrollreveal';
import { useEffect } from "react"
import { useRef } from "react"
import Link from "next/link"


const HomePage = () => {

    const preventReexicution = useRef<boolean>(false)


    useEffect(() => {

        if (preventReexicution.current) return

        const options = {
            delay: 500,
            duration: 1000,
            interval: 200,
            scale: 1.2,
            reset: true
        }

        ScrollReveal().reveal('.animation', options);

        preventReexicution.current = true

    }, [])


    return (
        <>
            <div className={style.background}>
                <div className="container">
                    <div className="row justify-content-around align-items-center" style={{ minHeight: '90vh' }}>

                        <div className="col-lg-6">

                            {/* Image */}

                            <div className="d-flex justify-content-center animation">
                                <Image src={hero} style={{ width: 300, height: 300 }} priority={true} alt="" />
                            </div>

                            <section className="text-center">

                                {/* Brand Name */}

                                <h1 className={` animation my-3 ${heading_font.className} ${style.heading}`}><span className="text-success">H</span>ome <span className="text-success">N</span>eeds</h1>
                                <p className="fs-3 text-secondary fw-medium animation" >Your Kitchen Companion</p>
                                <p style={{ color: 'grey' }} className="animation">Conquer meal planning with ease! Add delicious recipes and generate your shopping list in one place. Hit the button and create free account.</p>

                                {/* Button */}

                                <div className="my-4 animation" >
                                    <Link href="/auth/signUp" className={style.btn}>Get Started</Link >
                                </div>

                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage

