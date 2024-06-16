import React, { ReactNode } from 'react'
import Navbar from '../navbar/navbar'

const RecipesLayout = ({ children }: any) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}

export default RecipesLayout