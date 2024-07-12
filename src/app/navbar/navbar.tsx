"use client"
import { use, useEffect, useRef, useState } from 'react'
import style from './navbar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logo_font } from '../../../public/fonts/fonts'
import { useAppSelector, useAppDispatch } from '@/Store/hooks/hooks'
import React from 'react'
import { removeUser } from '@/Store/Slice/userSlice'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export type userType = {
  userName: string,
  email: string
}

const Navbar = () => {

  // hooks
  const [isNavOpend, setNavOpen] = useState<boolean>(false)
  const [user, setUser] = useState<userType | null>(null)

  const isChecked = useRef<any>()
  const path = usePathname()
  const Dispatch = useAppDispatch()
  const router = useRouter()

  const userData = useAppSelector((state) => state.user).user // will call each re-render . hooks cant call in another hooks or any functions body except root function.

  useEffect(() => {
    setUser(userData) // should setUser data once while loading comp and while state changing of dependeble var.
  }, [userData])      // done this to migrate hydration error


  const onNavigate = () => {
    setNavOpen(false)
    isChecked.current.checked = false
  }


  const onLogout = async () => {
    try {

      const response = await axios.get('/API/logout')
      toast.success(response.data.message)
      Dispatch(removeUser())
      onNavigate()
      router.push('/')

    } catch (err: any) {

      toast.error(err.response.date.message)

    }
  }


  const onHamburger = () => {
    setNavOpen(!isNavOpend)
  }


  return (
    <>
      <header className={`mb-2 ${style.header}`}>

        <Link href={'/'} className={`${style.navbar_brand}  ${logo_font.className} text-black`} ><span className={style.highlight_logo}>H</span>ome <span className={style.highlight_logo}>N</span>eeds</Link>

        <div id={style.menuToggle} className={style.hamburger}>
          <input id="checkbox" ref={isChecked} className={style.checkbox} type="checkbox" />
          <label className={style.toggle} htmlFor='checkbox' onClick={onHamburger}>
            <div className={`${style.bar} ${style.bar_top}`}></div>
            <div className={`${style.bar} ${style.bar_middle}`}></div>
            <div className={`${style.bar} ${style.bar_bottom}`}></div>
          </label>
        </div>



        <nav className={`${style.navBar} ${isNavOpend && style.navOpen}`}>


          <ul className={style.nav_links}>

            {/* On mobile username and logo */}

            {user &&
              <>
                <li className='d-flex align-items-center text-start gap-2 d-md-none'>

                  <div className={style.profile_logo}>
                    <p>{user.userName.charAt(0)}</p>
                  </div>

                  <div>

                    <Link
                      href={`/profile?user=${user.userName}`}
                      className='mt-1 fw-bold text-decoration-none display-5 link-dark'
                      onClick={onNavigate}
                    >
                      {user?.userName}
                    </Link>

                    <p>
                      {user?.email}
                    </p>

                  </div>
                </li>

                <hr className='d-md-none' />
              </>
            }


            {/* recipe list home */}

            <li className="nav-item">
              <Link href="/" className={`${style.links} ${path === '/' && style.navActive}`} onClick={onNavigate}>Recipie List</Link>
            </li >



            {/* Shopping List */}

            <li className="nav-item m-0 ">
              <Link href="/shopping_list" className={`${style.links} ${path === '/shopping_list' && style.navActive}`} onClick={onNavigate}>Shopping List</Link>
            </li >


            {/* add recipes on mobile */}

            {user &&
              <li className='nav-item d-md-none'>
                <Link href="recipe_form" className={`${style.links} ${path === '/recipe_form' && style.navActive}`} onClick={onNavigate}>Add Recipe</Link>
              </li>
            }

            {/* logout on mobile*/}

            {user &&
              <li className="nav-item d-md-none">
                <hr />
                <a className={`${style.links} link-danger`} onClick={onLogout}> Logout </a >
              </li >
            }


            {!user && <li className="nav-item">
              <hr className=' d-md-none' />
              <Link href="/auth/logIn" className={`${style.links} text-center text-white px-md-4`} style={{ background: 'rgb(0, 202, 0)' }} onClick={onNavigate}>Log In / Sign Up</Link>
            </li >
            }



            {/* Dropdown  */}

            {user && <li className="navbar-nav d-none d-md-block">

              <div className="nav-item dropdown">

                {/*  responsible for showing name  */}

                <a className="nav-link dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i className='bx bx-user-circle mx-1 fs-3'></i> <span style={{ fontWeight: 600 }}>{user.userName}</span>
                </a>


                <ul className=" dropdown-menu rounded-4 " style={{ width: 250 }}>


                  {/* profile */}

                  <li className='my-4'>
                    <Link href={`/profile?user=${user.userName}`} className={`${style.links}`} onClick={onNavigate}>Profile</Link>
                  </li>


                  {/* add recipes  */}

                  <li className='my-4'>
                    <Link href="recipe_form" className={`${style.links}`} onClick={onNavigate}>Add Recipe</Link>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* logout */}

                  <li className="nav-item my-2">
                    <a className=' link-danger fw-bold text-decoration-none' onClick={onLogout}> Logout </a >
                  </li >

                </ul >
              </div >

            </li >
            }

          </ul >
        </nav >
      </header >
    </>
  )
}

export default Navbar