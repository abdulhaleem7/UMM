import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/img/logo/umm-logo.png"

import NavMenu from "./NavMenu";

interface MobileSidebarProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}
const MobileSidebar = ({ isActive, setIsActive }: MobileSidebarProps) => {

  return (
    <div className={isActive ? "mobile-menu-visible" : ""}>
      <div className="tgmobile__menu">
        <nav className="tgmobile__menu-box">
          <div onClick={() => setIsActive(false)} className="close-btn"><i className="tg-flaticon-close"></i></div>
          <div className="nav-logo">
            <Link href="/"><Image src={logo} alt="Logo" style={{ "width": "100px" }} /></Link>
          </div>
          <div className="tgmobile__search">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search here..." />
              <button><i className="fas fa-search"></i></button>
            </form>
          </div>
          <div className="tgmobile__menu-outer">
            <NavMenu />
            <li>
              <div className="tgmenu__navbar-wrap tgmenu__main-menu m-10" style={{ "marginLeft": "20px" }}>
                <Link href="/request-a-quote" className="btn" style={{ "color": "white" }}>Request a quote</Link>
              </div>
            </li>
          </div>
          <div className="social-links">
            <ul className="list-wrap">
              <li><a href="https://www.facebook.com/share/18xBbghrF6/?mibextid=wwXIfr"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="https://x.com/unifiedmovers?s=21"><i className="fab fa-x-twitter"></i></a></li>
              <li><a href="https://www.instagram.com/unifiedmoving_master?igsh=YjNtdGF0cWNncWF0&utm_source=qr"><i className="fab fa-instagram"></i></a></li>
              <li><a href="https://wa.me/13653563255"><i className="fab fa-whatsapp"></i></a></li>
              <li><a href="https://www.linkedin.com/in/abdulahi-lawal-897837357?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"><i className="fab fa-linkedin-in"></i></a></li>
              <li><a href="https://www.tiktok.com/@unifiedmovingmaster?_t=ZM-8w0ScrIvJEU&_r=1"><i className="fab fa-tiktok"></i></a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="tgmobile__menu-backdrop" onClick={() => setIsActive(false)}></div>
    </div>
  )
}

export default MobileSidebar

