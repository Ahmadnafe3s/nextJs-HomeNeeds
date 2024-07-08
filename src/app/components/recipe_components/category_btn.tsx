import { RevealList } from 'next-reveal'
import Link from 'next/link'
import React from 'react'
import style from './recipe_components.module.css'

const CategoryButton = () => {
    return (
        <>
            {/* Categories Section */}

            <RevealList delay={500} interval={200} duration={1000} reset={false} scale={1.1} className={`d-flex justify-content-center gap-3 gap-md-5 flex-wrap py-4 my-3 ${style.category_container}`}>

                <div><Link href={'/recipe_category?category=break fast'}>Break Fast</Link></div>
                <div><Link href={'/recipe_category?category=lunch'}>Lunch</Link></div>
                <div><Link href={'/recipe_category?category=dinner'}>Dinner</Link></div>
                <div><Link href={'/recipe_category?category=fast food'}>Fast Food</Link></div>

            </RevealList>
        </>
    )
}

export default CategoryButton