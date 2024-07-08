import React from 'react'
import style from './loadingSpinner-2.module.css'

const LoadinSpinner_2 = () => {
  return (
    <div className={style.spinner}>
      <svg viewBox="25 25 50 50" className={style.circular}>
        <circle strokeMiterlimit="10" strokeWidth="4" fill="none" r="20" cy="50" cx="50" className={style.path}></circle>
      </svg>
    </div>
  )
}

export default LoadinSpinner_2