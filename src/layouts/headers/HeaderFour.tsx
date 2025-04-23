"use client"
import Link from "next/link"
import NavMenu from "./menu/NavMenu"
// import Image from "next/image"
import UseSticky from "@/hooks/UseSticky"
import { useState } from "react"
import OffCanvas from "./menu/OffCanvas"
import MobileSidebar from "./menu/MobileSidebar"

// import logo from "@/assets/img/logo/logo02.svg"
import HeaderTopFour from "./HeaderTopFour"

const HeaderFour = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <header>
         <div id="header-fixed-height"></div>
         <HeaderTopFour />
         <div id="sticky-header" className={`tg-header__area tg-header__area-two ${sticky ? "tg-sticky-menu sticky-menu sticky-menu__show" : ""}`}>
            <div className="container-fluid p-0">
               <div className="row gx-0">
                  <div className="col-12">
                     <div className="tgmenu__wrap">
                        <div className="logo">
                        {/* <Image src={logo} alt="Logo" /> */}
                           <Link href="/"><h3>UnifiedMoving</h3></Link>
                        </div>
                        <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                           <NavMenu />
                        </div>
                        <div className="tgmenu__action tgmenu__action-two d-none d-md-flex">
                           <ul className="list-wrap">
                              <li>
                                 <div className="offcanvas-toggle offcanvas-toggle-two">
                                    <a onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="menu-tigger">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                          <path d="M1.66669 15H28.3334M1.66669 6.66666H28.3334M1.66669 23.3333H28.3334" stroke="currentcolor" strokeWidth="1.83333" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                    </a>
                                 </div>
                              </li>
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
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </header>
   )
}

export default HeaderFour
