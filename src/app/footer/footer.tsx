import React from 'react'
import style from './footer.module.css'

const Footer = () => {
    return (
        <div className={style.container}>

            <p className='mb-1'> &copy; All Rights reserved to HomeNeeds</p>

            <p>created by <a href='https://portfolio-c9b1e.web.app/' target='main'>Nafees Ahmad</a></p>
        </div>
    )
}

export default Footer