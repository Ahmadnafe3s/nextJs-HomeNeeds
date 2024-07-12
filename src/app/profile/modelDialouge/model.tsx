import React from 'react'
import style from './model.module.css'
import Link from 'next/link'
import { useAppSelector } from '@/Store/hooks/hooks'

const Model = ({ Image, ID, Name, username, event, onDelete }: { Image: string, ID: string, Name: string, username: string, event: any, onDelete: any }) => {

  const user = useAppSelector(state => state.user.user)

  console.log(!user);


  return (
    <>
      <div className='min-vh-100 w-100 position-fixed top-0 start-0' style={{ background: '#00000082', zIndex: 100 }} onClick={event}></div>

      <div className={style.model}>

        <div className={style.img_container}>
          <img src={Image} className=' object-fit-cover rounded-4' alt="" />
        </div>

        <div className='mt-4'>

          <h4 className='fw-bold pt-2'>{Name}</h4>

          <p className=' text-secondary my-3'>You can perform specific actions on your post.</p>

          <div className={style.btn_container}>

            <Link className='link-success' href={`recipe_details/${ID}`}><i className='bx bx-info-circle' ></i></Link>

            {user && (user.userName === username) && <Link className='link-primary' href={'/check'}><i className='bx bx-edit-alt' ></i></Link>}

            {user && (user.userName === username) && <a className='link-danger' onClick={() => onDelete(ID)}><i className='bx bx-trash'></i></a>}

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