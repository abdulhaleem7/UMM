"use client"
import Link from "next/link"
import NavMenu from "./menu/NavMenu"
import Image from "next/image"
import HeaderTopOne from "./HeaderTopOne"
import UseSticky from "@/hooks/UseSticky"
import { useState } from "react"
import OffCanvas from "./menu/OffCanvas"
import HeaderSearch from "./menu/HeaderSearch"
import MobileSidebar from "./menu/MobileSidebar"

import logo from "@/assets/img/logo/logo.svg"

const HeaderOne = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [isSearch, setIsSearch] = useState<boolean>(false);
   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <header>
         <div id="header-fixed-height"></div>
         <HeaderTopOne />
         <div id="sticky-header" className={`tg-header__area ${sticky ? "tg-sticky-menu sticky-menu sticky-menu__show" : ""}`}>
            <div className="container-fluid p-0">
               <div className="row gx-0">
                  <div className="col-12">
                     <div className="tgmenu__wrap">
                        <div className="tgmenu__nav-left-side">
                           <div className="offcanvas-toggle">
                              <Link href="#" onClick={() => setOffCanvas(true)} className="menu-tigger">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path d="M1.66669 15H28.3334M1.66669 6.66666H28.3334M1.66669 23.3333H28.3334" stroke="currentcolor" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                              </Link>
                           </div>
                           <div className="logo">
                              <Link href="/"><Image src={logo} alt="Logo" /></Link>
                           </div>
                        </div>
                        <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                           <NavMenu />
                        </div>
                        <div className="tgmenu__action d-none d-md-flex">
                           <ul className="list-wrap">
                              <li className="header-search">
                                 <a onClick={() => setIsSearch(true)} style={{ cursor: "pointer" }} className="search-open-btn">
                                    <i className="flaticon-search"></i>
                                 </a>
                              </li>
                              <li className="header-contact">
                                 <div className="icon">
                                    <i className="flaticon-telephone"></i>
                                 </div>
                                 <div className="content">
                                    <span>Emergency Call:</span>
                                    <Link href="tel:0123456789">(205) 555-0100</Link>
                                 </div>
                              </li>
                              <li className="header-btn"><Link href="/contact" className="btn"><i className="flaticon-uptrend"></i>Track Order</Link></li>
                           </ul>
                        </div>
                        <div className="mobile-nav-toggler" onClick={() => setIsActive(true)}>
                           <i className="tg-flaticon-menu-1"></i>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
         <OffCanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
         <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </header>
   )
}

export default HeaderOne
