"use client"

import style from './recipe_list.module.css'
import { RevealList } from 'next-reveal'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Banner from '../components/recipe_components/banner'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadinSpinner_2 from '../components/loadingSpinner-2/loadingSpinner-2'
import { recipesListResponseType } from './Types/recipeType'
import { useSearchParams } from 'next/navigation'
import SearchBar from '../components/recipe_components/searchBar'
import RecipeCard from '../components/recipe_components/card'
import CategoryButton from '../components/recipe_components/category_btn'
import Footer from '../footer/footer'


const RecipesComponent = () => {

  const searchPage = Number(useSearchParams().get('page')) || 1
  const Limit = 15;
  const [resData, setResData] = useState<{ Recipe_List: recipesListResponseType[], total_items: number }>()

  const [total_pages, setTotal_page] = useState<number>(0)

  const fetchRecipes = async () => {
    try {
      const response = await axios.get<{ Recipe_List: recipesListResponseType[], total_items: number }>(`/API/getRecipeList?page=${searchPage}&limit=${Limit}`)
      setResData(response.data)
      setTotal_page(Math.round(response.data.total_items / Limit) || 1) // suppose 6 / 12 = 0.5 round = 1  if 0 then by default 1

    } catch (error: any) {
      toast.error(error.response.data.message)
    }

  }


  useEffect(() => {

    fetchRecipes()

  }, [searchPage])



  return (

    <>

      {/* only will display on page 1 */}

      {searchPage === 1 && <Banner />}

      <SearchBar position='end' />


      <br />


      {/* A component made by me into recipe component*/}

      <CategoryButton />


      {/* Recipe list */}

      <div className="container py-5">
        <div className="row gap-5 justify-content-center align-items-center">

          <div>
            <p className=' display-2 fw-bold text-center' style={{ color: 'green' }}>Recipes That Unlock Taste.</p>
            <p className='text-center'>Checkout these recipes list and cook delicious foods. </p>
          </div>


          {/* Cards */}

          {resData?.Recipe_List ? resData.Recipe_List.map((recipe, index) => {

            return (
              <RecipeCard Name={recipe.Name} Image={recipe.RecipeImage.url} ID={recipe._id} Description={recipe.Description} key={index} />
            )
          })

            :

            <div className='d-grid justify-content-center align-items-center' style={{ minHeight: '70vh' }}>
              <LoadinSpinner_2 />
            </div>
          }



          {/* Next and prev buttons */}

          {resData?.total_items &&

            < div className='d-flex align-items-center justify-content-center gap-4'>

              <button type='button' className='theame_dark p-0' disabled={searchPage <= 1}>
                <Link className=' link-light text-decoration-none py-2 px-4 d-inline-block' href={`/recipe_list?page=${searchPage - 1}`} >Previous</Link>
              </button>

              <p className='fs-5 fw-bold pt-3'>{searchPage} / {total_pages}</p>

              <button type="button" className='theame_dark p-0' disabled={searchPage >= total_pages}>
                <Link className=' link-light text-decoration-none py-2 px-4 d-inline-block' href={`/recipe_list?page=${searchPage + 1}`} >Next</Link>
              </button>

            </div>
          }


        </div>
      </div>

      <Footer />

    </>
  )
}

export default RecipesComponent

function setData(data: { Recipe_List: recipesListResponseType[]; total_items: number }) {
  throw new Error('Function not implemented.')
}
