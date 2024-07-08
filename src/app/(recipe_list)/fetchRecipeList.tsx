"use client"
import { fetchRecipelist, recipeListResponseType } from '@/Store/Slice/recipeListSlice';
import { useAppDispatch, useAppSelector } from '@/Store/hooks/hooks';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const FetchRecipeList = () => {
    const dispatch = useAppDispatch()
    // const data: recipeListResponseType = useAppSelector((state) => state.recipes.Recipe_List);
    const status = useAppSelector((state: any) => state.recipes.status);
    const error = useAppSelector((state: any) => state.recipes.error);
    const user = useAppSelector(state=>state.user).user


    useEffect(() => {
        
        if (user) { 
            if (status === 'idle') {
                dispatch(fetchRecipelist('hello'))
            }
        }

        if (error) {
            toast.error(error)
        }

    }, [status , user])


    return (<></>)
}

export default FetchRecipeList