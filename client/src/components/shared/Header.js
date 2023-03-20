import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiMenuAltRight } from 'react-icons/bi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import classes from '../../styles/Header.module.scss'

export default function Header() {
   let token = localStorage.getItem('access_token')
   const navigate = useNavigate()
   const [menuOpen, setMenuOpen] = useState(false)
   const [isLogedIn, setIsLogedIn] = useState(token ? true : false)
   const [size, setSize] = useState({
      width: undefined,
      height: undefined,
   })

   //Resize Method
   useEffect(() => {
      const handleResize = () => {
         setSize({
            width: window.innerWidth,
            height: window.innerHeight,
         })
      }
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
   }, [])
   useEffect(() => {
      let it = localStorage.getItem('access_token')
      setIsLogedIn(it ? true : false)
   }, [localStorage.getItem('access_token')])
   //Menu
   useEffect(() => {
      if (size.width > 768 && menuOpen) {
         setMenuOpen(false)
      }
   }, [size.width, menuOpen])

   const menuToggleHandler = () => {
      setMenuOpen((p) => !p)
   }

   const loginClickHandler = () => {
      menuToggleHandler()
      navigate('/auth/login')
   }
   const logoutClickHandler = () => {
      menuToggleHandler()
      // TODO: local storge token temizle
      localStorage.clear()
      navigate('/auth/login')
   }
   return (
      <header className={classes.header}>
         <div className={classes.header__content}>
            <Link to="/" className={classes.header__content__logo}>
               Internview
            </Link>
            <nav
               className={`${classes.header__content__nav} ${
                  menuOpen && size.width < 768 ? classes.isMenu : ''
               }`}
            >
               <ul>
                  <li>
                     <Link to="/advertisement" onClick={menuToggleHandler}>
                        İş İlanları
                     </Link>
                  </li>
                  <li>
                     <Link to="/problems" onClick={menuToggleHandler}>
                        Problemler
                     </Link>
                  </li>
                  <li>
                     <Link to="/collaborativeIDE" onClick={menuToggleHandler}>
                        Birlikte Geliştirelim
                     </Link>
                  </li>
               </ul>
               {!isLogedIn ? (
                  <button onClick={loginClickHandler}>Giriş Yap</button>
               ) : (
                  <button onClick={logoutClickHandler}>Çıkış Yap</button>
               )}
            </nav>
            <div className={classes.header__content__toggle}>
               {!menuOpen ? (
                  <BiMenuAltRight onClick={menuToggleHandler} />
               ) : (
                  <AiOutlineClose onClick={menuToggleHandler} />
               )}
            </div>
         </div>
      </header>
   )
}
