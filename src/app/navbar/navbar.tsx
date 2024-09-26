"use client"
import style from './navbar.module.css'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logo_font } from '@/fonts/fonts'
import toast from 'react-hot-toast'
import AlertDialogue from '../components/alert/alert'
import { signOut, useSession } from 'next-auth/react'
import UserModelComponent from './userModel/userModel'




const Navbar = () => {

  const [isNavOpend, setNavOpen] = useState<boolean>(false)
  const [logout, setLogout] = useState({ message: '', logStatus: false })
  const [isUserModelVisible, setUserModelVisibility] = useState(false)
  const isChecked = useRef<any>()
  const { data: session, status } = useSession()
  const path = usePathname()



  // for mobile only
  const onNavigate = () => {
    setNavOpen(false)
    if (isChecked.current) {
      isChecked.current.checked = false
    }
  }


  const onLogout = async () => {

    setLogout({ message: 'Are you sure to logout from your account!', logStatus: true })
    setUserModelVisibility(false)

  }


  const onOk = async () => {

    signOut({ redirectTo: '/' })  // it belongs to next-auth/react not from @/auth file only can be use in client side
    toast.success("User LoggedOut!")
    onNavigate()
    setLogout({ message: '', logStatus: false })

  }


  const onHamburger = () => {

    setNavOpen(!isNavOpend)

  }



  return (
    <>
      <header className={`mb-2 ${style.header}`}>

        <Link href={'/'} className={`${style.navbar_brand}  ${logo_font.className} text-black fs-2`} ><span className={style.highlight_logo}>H</span>ome <span className={style.highlight_logo}>N</span>eeds</Link>


        <section className=' d-flex gap-4 gap-md-2 align-items-center'>


          {/* User logo */}

          {status === 'authenticated' &&
            <div className={`order-md-2 ${style.userLogo}`} onClick={() => setUserModelVisibility(true)}>
              <p>{session?.user?.name?.charAt(0)}</p>
            </div>
          }


          {/* Hamburger */}

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

              {/* recipe list home */}

              <li className="nav-item">
              <hr className=' d-md-none' />
                <Link href="/" className={`${style.links} ${path === '/' && style.navActive}`} onClick={onNavigate}>Recipie List</Link>
              </li >

              {/* Shopping List */}

              <li className="nav-item m-0 ">
              <hr className=' d-md-none' />
                <Link href="/shopping_list" className={`${style.links} ${path === '/shopping_list' && style.navActive}`} onClick={onNavigate}>Shopping List</Link>
              </li >

              {/* add recipes on mobile */}


              {status === 'authenticated' &&
                <li className='nav-item d-md-none'>
                  <hr className=' d-md-none' />
                  <Link href="/recipe_form" className={`${style.links} ${path === '/recipe_form' && style.navActive}`} onClick={onNavigate}>Post Recipe</Link>
                </li>
              }


              {/* Log in  button */}

              {status === 'unauthenticated' &&
                <li className="nav-item">
                  <hr className=' d-md-none' />
                  <Link href="/logIn" className={`${style.links} text-center text-white px-md-4`} style={{ background: 'rgb(0, 202, 0)' }} onClick={onNavigate}>Log In</Link>
                </li >
              }

            </ul >
          </nav >

        </section>
      </header >



      {/* models */}

      {logout.logStatus && <AlertDialogue message={logout.message} ok={onOk} close={() => setLogout({ message: '', logStatus: false })} />}


      {/* will display currently logged user details */}

      {isUserModelVisible &&
        <UserModelComponent
          logout={onLogout}
          closeUserModel={() => { setUserModelVisibility(false) }}
        ></UserModelComponent>

      }

    </>

  )
}

export default Navbar
