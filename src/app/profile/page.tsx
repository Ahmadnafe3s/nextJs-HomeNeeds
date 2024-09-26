"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react'
import style from './profile.module.css'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadinSpinner_2 from '../components/loadingSpinner-2/loadingSpinner-2'
import Link from 'next/link'
import Model from './modelDialouge/model'
import AlertDialogue from '../components/alert/alert'
import { signOut, useSession } from 'next-auth/react'


type profileDataRes = {
    userProfileData: [
        {
            _id: string,
            Name: string,
            RecipeImage: { url: string, public_id: string },
        }
    ]
}


const ProfileComponent = () => {

    const user = useSearchParams().get('user')
    const [profile, setProfile] = useState<profileDataRes>()
    const [loading, setLoading] = useState<boolean>(true)
    const [model, setModel] = useState<any>(null)
    const [delteMessage, setDeletmessage] = useState<null | string>(null)
    const deleteType = useRef<'recipe' | 'account'>()
    const deleteQuery = useRef({ id: '', public_id: '' })
    const { data: session } = useSession()




    const fetchProfiledata = async () => {
        try {
            setLoading(true)
            const response = await axios.get<profileDataRes>(`/api/getProfileData?user=${user}`)
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



    //when click on post
    const onPost = (index: number) => {
        setModel(profile?.userProfileData[index])
    }



    const onDelete = (ID: string, PUBLIC_ID: string) => {
        deleteQuery.current.id = ID; // taking id of selected recipe which have to delete
        deleteQuery.current.public_id = PUBLIC_ID
        deleteType.current = 'recipe'
        setDeletmessage('Are you sure to delete this recipe?')
        setModel(null)
    }


    const onDeactivate = () => {
        setDeletmessage('Are you really sure to deactivate your account?')
        deleteType.current = 'account'
    }


    const onOk = async () => {

        try {

            if (deleteType.current === 'recipe') {
                const res = await axios.delete(`/api/deleteRecipe?id=${deleteQuery.current.id}&p_id=${deleteQuery.current.public_id}`)
                fetchProfiledata();
                toast.success(res.data.message)
            }

            if (deleteType.current === 'account') {
                const res = await axios.post('/api/Account/deactivateAccount', { username: user });
                toast.success(res.data.message)
                signOut({ redirectTo: '/' })
            }

            setDeletmessage(null)
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }


    return (
        <>
            <div className="container" style={{ minHeight: '78vh' }}>
                <div className="row justify-content-center gap-5 ">
                    <div className="col-md-10 text-center mt-5">

                        {/* Responsible for showing LOGO , username , total posts*/}

                        <div >

                            <div className={`${style.profile_logo}  mx-auto`}>
                                <p>{user?.charAt(0)}</p>
                            </div>

                            <h3 className='mt-4 mb-2 fw-bold  display-5' >
                                {user}
                            </h3>
                            <p className='mb-5'><span className='fs-4 fw-bold me-1'>{profile?.userProfileData.length}</span> TOTAL POSTS</p>
                        </div>



                        {/* Responsible for showing POSTS */}

                        {!loading &&
                            <div className={`${style.post_container} mb-5`}>


                                {(profile?.userProfileData.length! > 0) && profile?.userProfileData.map((elem, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={elem.RecipeImage.url} alt='' onClick={() => { onPost(index) }} />
                                            <p className='fw-bold mt-2'>{elem.Name}</p>
                                        </div>
                                    )
                                })}

                            </div>
                        }


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
                            <div className='d-flex justify-content-center py-5' style={{ minHeight: '40vh' }}>
                                <LoadinSpinner_2 />
                            </div>
                        }

                    </div>


                    {/* Responsoble for showing links */}

                    {user === session?.user?.name &&
                        <div className={style.links}>
                            <hr />
                            <div className=" mb-3">
                                <Link href={`/changePassword?user=${user}`} style={{ background: "rgb(0 169 0)" }} className='text-white py-2 px-2 px-md-4 rounded-1'>Change Password</Link>
                                <span className=' mx-2'>|</span>
                                <a className=' border border-1 border-black text-dark rounded-1 py-2 px-2 px-md-4' onClick={onDeactivate}>Deactivate Account</a>
                            </div>
                        </div>
                    }

                </div>
            </div>


            {/* MODELS */}

            {model && <Model
                Name={model.Name!}
                Image={model.RecipeImage}
                ID={model._id!}
                username={user!}
                event={() => { setModel(null) }}
                onDelete={(ID: string, PUBLIC_ID: string) => { onDelete(ID, PUBLIC_ID) }}
            />}

            {delteMessage && <AlertDialogue message={delteMessage} ok={onOk} close={() => setDeletmessage(null)} />}

        </>
    )
}



export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileComponent />
        </Suspense>
    );
}