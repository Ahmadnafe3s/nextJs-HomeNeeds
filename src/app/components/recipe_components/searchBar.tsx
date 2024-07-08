"use client"

import { useRouter } from 'next-nprogress-bar';
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SearchBar = ({ position }: { position: 'center' | 'end' | 'start' }) => {

    const [search, setSearch] = useState<string | null>(null)
    const router = useRouter()

    const onSearch = () => {
        if (!search) return toast.error('Enter Something.')
        router.push(`search_recipe_list?search=${search}`)
    }


    return (
        <>
            {/* serch section */}

            <div className='container my-5'>

                <div className={`row justify-content-${position}`}>

                    <div className="col-lg-4 col-md-5 col-11">

                        <p className='fw-bold fs-3'>Serach Recipes.</p>

                        <div className='d-flex'>

                            <input type="search" className='form-control rounded-3 me-2' placeholder='search recipes' onChange={(event) => setSearch(event.target.value)} />

                            <div>
                                <button type='button' className={'theame_dark rounded-3'} onClick={onSearch}>Search</button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SearchBar