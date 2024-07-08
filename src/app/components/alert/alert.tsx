import React from 'react'
import style from './alert.module.css'

const AlertDialogue = ({ message, ok, close }: { message: string | null, ok: any, close : any}) => {

    return (
        <>
            <div className={style.backdrop} onClick={close} ></div >

            <div className="container-fluid ">
                <div className="row justify-content-center">

                    <section className={`${style.alert_container}`}>

                        <div className={style.icon}>
                            <i className='bx bx-error'></i>
                        </div>

                        <p className="fs-3 text-center">Warning!</p>

                        <p className="text-center text-secondary">{message}</p>


                        {/* Ok Button  */}
                        <div className="mt-5">
                            <button type="button" className="btn btn-danger w-100" onClick={ok} >Yes</button>
                        </div>

                        {/* Cancel Button */}

                        <div className="text-center mt-2 text-primary fw-bold">
                            <a type="button" onClick={close} style={{ cursor: 'pointer' }}>Cancel</a>
                        </div>
                    </section >
                </div >
            </div >
        </>
    )
}

export default AlertDialogue