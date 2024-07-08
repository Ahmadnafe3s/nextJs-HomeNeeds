"use client"
import { useEffect, useState } from 'react'
import RecipeCard from '../../components/recipe_components/card'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { recipesListResponseType, recipeType } from '../Types/recipeType'
import LoadinSpinner_2 from '@/app/components/loadingSpinner-2/loadingSpinner-2'
import toast from 'react-hot-toast'
import SearchBar from '@/app/components/recipe_components/searchBar'

const SearchComponent = () => {

  const params = useSearchParams().get('search')
  const [resData, setResData] = useState<{ Recipe_List: recipesListResponseType[] }>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchSearchedList = async () => {

    try {

      setLoading(true)
      const response = await axios.get<{ Recipe_List: recipesListResponseType[] }>(`/API/getSearchResult?search=${params}`)
      setResData(response.data)
      setLoading(false)

    } catch (err: any) {

      toast.error(err.response.data.message)
      setLoading(false)

    }

  }


  useEffect(() => {
    fetchSearchedList()
  }, [params])

  return (
    <>

      <br />

      <div className='mt-5 px-4 text-center'>
        <p className="display-3 fw-bold">Search results for "<span style={{ color: 'green' }}>{params}</span>"</p>
        <p >Showing results for "{params}" - A variety of delicious recipes, that you can use to cook delicious foods which will love by everyone.</p>
      </div>

      <SearchBar position={'end'} />

      {/*   Conatiner */}

      <div className="container mt-md-5 mt-3 py-3">

        <div className="row justify-content-center gap-5">

          {/* Responsible for showing recipe list... */}

          {(resData?.Recipe_List.length! > 0) &&
            resData?.Recipe_List.map((recipes, index) => {
              return (
                <RecipeCard Name={recipes.Name} Description={recipes.Description} ID={recipes._id} Image={recipes.RecipeImage.URL} key={index} />
              )
            })
          }



          {/* Responsible for showing not found error ... */}

          {
            (resData?.Recipe_List.length! < 1 && !loading) &&
            <div className="col-md-9 col-11 rounded-4 py-5 px-2  text-center my-3 d-grid align-items-center" style={{ border: '4px dotted black', minHeight: '50vh' }}>
              <i className='bx bx-error-alt display-2'></i>
              <p className="display-5 fw-bold">
                The recipe you are tryig to search is Not found.
              </p>
              <p>
                You can search another recipe.
              </p>
            </div>
          }


          {/* Loader */}

          {loading &&
            <div className='d-grid justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
              <LoadinSpinner_2 />
            </div>
          }

        </div>
      </div>


    </>
  )
}

export default SearchComponent