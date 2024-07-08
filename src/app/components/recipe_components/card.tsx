import React from 'react'
import style from './recipe_components.module.css'
import Link from 'next/link'

const RecipeCard = ({ Name, Image, Description, ID }: { Name: string, Image: string, Description: string, ID: string | undefined }) => {
  return (
    <article className={`${style.card} `}>
      <div className={style.card_img}>
        <img src={Image} alt="Recipe Image" />
      </div>

      <div className={style.content_container }>
        <section className='mt-2'>
          <p className="fs-4 fw-bold" >{Name}</p>
          <p className="text-secondary" style={{ maxHeight: '70px', overflow: 'hidden' }}>{Description}</p>
        </section>

        <div className="pb-2 text-center">
          <hr />
          <Link href={`/recipe_details/${ID}`} className="link-success text-decoration-none fw-bold " >Checkout</Link>
        </div>
      </div>

    </article>

  )
}

export default RecipeCard