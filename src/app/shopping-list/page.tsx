"use client"

import { useEffect } from "react"

const ShoppingListComponent = () => {

    const test = () => {
        console.log(window.location.hash);
    }

    return (
        <>
            <div>ShoppingListComponent</div>
            <button onClick={test}>Test</button>
        </>
    )
}

export default ShoppingListComponent