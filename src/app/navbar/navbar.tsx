"use client"
import { useRef, useState } from 'react'
import style from './navbar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logo_font } from '../../../public/fonts/fonts'


const Navbar = () => {
  // hooks
  const [isNavOpend, setNavOpen] = useState<boolean>(false)
  const isChecked = useRef<any>(true)
  const path = usePathname()


  const onNavigate = () => {
    setNavOpen(false)
    isChecked.current.checked = false
  }


  const onLogout = () => { }


  const onHamburger = () => {
    setNavOpen(!isNavOpend)
  }


  return (
    <>
      <header className={`mb-2 ${style.header}`}>

        <p className={`${style.navbar_brand} ${logo_font.className}`} ><span className={style.highlight_logo}>H</span>ome <span className={style.highlight_logo}>N</span>eeds</p>

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

            <li className="nav-item">
              <Link href="/recipe-list" className={`${style.links} ${path === '/recipe-list' && style.navActive}`} onClick={onNavigate}>Recipie List</Link>
            </li >

            <li className="nav-item ">
              <Link href="/shopping-list" className={`${style.links} ${path === '/shopping-list' && style.navActive}`} onClick={onNavigate}>Shopping List</Link>
            </li >


            {/* Dropdown  */}

            <li className="navbar-nav">
              <div className="nav-item dropdown mx-auto">


                {/*  responsible for showing name  */}

                <a className="nav-link dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i className='bx bx-user-circle mx-1 fs-3'></i> <span style={{ fontWeight: 600 }}  >Khan Nafees</span>
                </a>

                <ul className="dropdown-menu">


                  {/* add recipes  */}

                  <li className='my-2'>
                    <Link href="/recipe-list/upsert-recipe" className={`${style.links}`} onClick={onNavigate}>Add Recipe</Link>
                  </li>

                  {/* logout */}

                  <li className="nav-item my-2">
                    <a className={style.links} onClick={onLogout}> Logout </a >
                  </li >
                </ul >
              </div >
            </li >
          </ul >
        </nav >
      </header >
    </>
  )
}

export default Navbar