"use client"
import { RevealList, RevealWrapper } from 'next-reveal'
import style from './recipe_components.module.css'
import { logo_font } from '../../../../public/fonts/fonts'
import bannerImg from '../../../../public/Images/banner.svg'
import Image from 'next/image'

const Banner = () => {

    return (
        <>
            <section className='bg-white'>
                <div className="container">

                    <div className="row py-5 justify-content-center align-items-center gap-5">

                        <RevealList delay={300} interval={200} duration={500} reset={false} scale={1.1} className="col-md-6 order-2 order-md-1 mt-4 text-center text-md-start" >
                            <h1 className={`${style.heading}  ${logo_font.className} fw-bold`}><span style={{ color: 'green' }}>H</span>ome <span
                                style={{ color: 'green' }}>N</span>eeds</h1>
                            <p className={style.title}>Your Kitchen Companion</p>
                            <p className={style.desc}>Conquer meal planning with ease! Add delicious recipes and generate your shopping list in one
                                place</p>

                            <hr />

                            <div className="mt-4">
                                <button type="button" className="theame_dark text">Post Recipe.</button>
                            </div>
                        </RevealList>

                        <RevealWrapper delay={100} duration={500} reset={false} className="col-md-4 order-1 order-md-2">

                            <div className={`mx-auto ${style.banner_img}`} >

                                <Image src={bannerImg} style={{ height: "100%", width: "100%" }} priority alt='' />

                            </div>

                        </ RevealWrapper>

                    </div>

                </div>
            </section>

        </>
    )
}

export default Banner