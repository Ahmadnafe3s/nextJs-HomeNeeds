import React from 'react'
import style from './model.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Model = ({ Image, ID, Name, username, event, onDelete }: { Image: { url: string, public_id: string }, ID: string, Name: string, username: string, event: any, onDelete: any }) => {

  const { data: session } = useSession()

  return (
    <>
      <div className='min-vh-100 w-100 position-fixed top-0 start-0' style={{ background: '#00000082', zIndex: 100 }} onClick={event}></div>

      <div className={style.model}>

        <div className={style.img_container}>
          <img src={Image.url} className=' object-fit-cover rounded-4' alt="" />
        </div>

        <div className='mt-4'>

          <h4 className='fw-bold pt-2'>{Name}</h4>

          <p className=' text-secondary my-3'>You can perform specific actions on your post.</p>

          <div className={style.btn_container}>

            <Link className='link-success' href={`recipe_details/${ID}`}><i className='bx bx-info-circle' ></i></Link>

            {session?.user?.name === username && <Link className='link-primary' href={`/recipe_form?id=${ID}`}><i className='bx bx-edit-alt' ></i></Link>}

            {session?.user?.name === username && <a className='link-danger' onClick={() => onDelete(ID, Image.public_id)}><i className='bx bx-trash'></i></a>}

          </div>
          <hr />
          <div className='text-center mb-2'>
            <a className=' text-decoration-none link-danger' onClick={event}>CANCEL</a>
          </div>
        </div>

      </div>
    </>
  )
}

export default Model