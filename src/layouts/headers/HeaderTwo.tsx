"use client"
import Link from "next/link"
import NavMenu from "./menu/NavMenu"
import Image from "next/image"
import UseSticky from "@/hooks/UseSticky"
import { useState } from "react"
import MobileSidebar from "./menu/MobileSidebar"
import InjectableSvg from "@/components/common/InjectableSvg"

import logo_1 from "@/assets/img/logo/w_logo.svg"
import logo_2 from "@/assets/img/logo/logo02.svg"
import HeaderTopTwo from "./HeaderTopTwo"

const HeaderTwo = () => {

   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <header className="transparent-header">
         <HeaderTopTwo />
         <div id="sticky-header" className={`tg-header__area tg-header__area-three ${sticky ? "tg-sticky-menu sticky-menu sticky-menu__show" : ""}`}>
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="tgmenu__wrap">
                        <div className="logo">
                           <Link href="/"><Image src={logo_1} alt="Logo" /></Link>
                        </div>
                        <div className="logo d-none">
                           <Link href="/"><Image src={logo_2} alt="Logo" /></Link>
                        </div>
                        <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                           <NavMenu />
                        </div>
                        <div className="tgmenu__action tgmenu__action-three d-none d-md-flex">
                           <ul className="list-wrap">
                              <li className="header-contact header-contact-two">
                                 <div className="icon">
                                    <i className="flaticon-telephone"></i>
                                 </div>
                                 <div className="content">
                                    <span>Emergency Call:</span>
                                    <Link href="tel:0123456789">(205) 555-0100</Link>
                                 </div>
                              </li>
                              <li className="header-btn">
                                 <Link href="/contact" className="btn btn-three">Get A Quote <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
                              </li>
                           </ul>
                        </div>
                        <div onClick={() => setIsActive(true)} className="mobile-nav-toggler mobile-nav-toggler-two">
                           <i className="tg-flaticon-menu-1"></i>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </header>
   )
}

export default HeaderTwo
