"use client"
import React, { useEffect, useRef, useState } from 'react'
import style from './profile.module.css'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadinSpinner_2 from '../components/loadingSpinner-2/loadingSpinner-2'
import Link from 'next/link'
import Model from './modelDialouge/model'
import AlertDialogue from '../components/alert/alert'


type profileDataRes = {
    userProfileData: [
        {
            _id: string,
            Name: string,
            RecipeImage: { URL: string, Asset_ID: String, Public_ID: string },
        }
    ]
}


const ProfileComponent = () => {

    const user = useSearchParams().get('user')
    const [profile, setProfile] = useState<profileDataRes>()
    const [loading, setLoading] = useState<boolean>(false)
    const [model, setModel] = useState<any>(null)
    const [delteMessage, setDeletmessage] = useState<null | string>(null)
    const id = useRef<string | null>(null)

    const fetchProfiledata = async () => {
        try {
            setLoading(true)
            const response = await axios.get<profileDataRes>(`/API/getProfileData?user=${user}`)
            setProfile(response.data)
            setLoading(false)
        } catch (error: any) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfiledata()
    }, [])


    const onPost = (index: number) => {
        setModel(profile?.userProfileData[index])
    }

    const onDelete = (ID: string) => {
        id.current = ID; // taking id of selected recipe which have to delete
        setDeletmessage('Are you sure you want to delete this recipe?')
        setModel(null)
    }

    const onOk = async () => {
        try {
            await axios.delete<profileDataRes>(`/API/deleteRecipe?id=${id.current}`)
            setDeletmessage(null)
            fetchProfiledata();
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    
    return (
        <>
            <div className="container">
                <div className="row justify-content-center gap-5 ">
                    <div className="col-md-10 text-center mt-5">

                        {/* Responsible for showing LOGO , username , total posts*/}

                        <div >

                            <div className={`style.profile_logo ${style.profile_logo}  mx-auto`}>
                                <p>{user?.charAt(0)}</p>
                            </div>

                            <h3 className='mt-4 mb-2 fw-bold  display-5' >
                                {user}
                            </h3>
                            <p className='mb-5'><span className='fs-4 fw-bold me-1'>{profile?.userProfileData.length}</span> TOTAL POSTS</p>
                        </div>



                        {/* Responsible for showing POSTS */}

                        <div className={`${style.post_container} mb-5`}>


                            {(profile?.userProfileData.length! > 0) && profile?.userProfileData.map((elem, index) => {
                                return (
                                    <div key={index}>
                                        <img src={elem.RecipeImage.URL} alt='' onClick={() => { onPost(index) }} />
                                        <p className='fw-bold'>{elem.Name}</p>
                                    </div>
                                )
                            })}

                        </div>


                        {/* Responsible for showing Info if no posts.*/}


                        {
                            (profile?.userProfileData.length! <= 0) && !loading &&

                            <div className=" rounded-4 py-5 px-2  text-center my-3 d-grid align-items-center" style={{ border: '4px dotted black', minHeight: '50vh' }}>
                                <i className='bx bx-error-alt display-2'></i>
                                <p className="display-5 fw-bold">
                                    There is no posts yet.
                                </p>
                                <p>
                                    You can post recipes so easily.
                                </p>
                                <div>
                                    <Link href="/recipe_form" className='theame_dark'>Post Recipe.</Link>
                                </div>
                            </div>
                        }

                        {/* Responsible for showing LOADING */}

                        {loading &&
                            <div className='d-flex justify-content-center py-5'>
                                <LoadinSpinner_2 />
                            </div>
                        }

                    </div>
                </div>
            </div>

            {/* MODELS */}

            {model && <Model Name={model.Name!} Image={model.RecipeImage.URL!} ID={model._id!} username={user!} event={() => { setModel(null) }} onDelete={(ID: string) => { onDelete(ID) }} />}
            {delteMessage && <AlertDialogue message={delteMessage} ok={onOk} close={() => setDeletmessage(null)} />}
        </>
    )
}

export default ProfileComponent