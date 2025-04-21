import Image from "next/image"
import Link from "next/link"
import InjectableSvg from "@/components/common/InjectableSvg"

import logo from "@/assets/img/logo/logo02.svg"

const ProjectDetailsSidebar = () => {
   return (
      <div className="col-30">
         <aside className="project__sidebar">
            <div className="services__widget services__widget-three">
               <h4 className="sidebar__widget-title">Project Information</h4>
               <div className="project__info">
                  <ul className="list-wrap">
                     <li><span>Client:</span>Makerscoecom</li>
                     <li><span>Category:</span>Cargo, Logistics</li>
                     <li><span>Date:</span>10 November, 2024</li>
                     <li><span>Tag:</span>Modern, Technology</li>
                  </ul>
               </div>
               <div className="project__sidebar-social">
                  <span className="title">Social:</span>
                  <ul className="list-wrap">
                     <li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link></li>
                     <li><Link href="https://www.whatsapp.com/" target="_blank"><i className="fab fa-whatsapp"></i></Link></li>
                     <li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></Link></li>
                     <li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></Link></li>
                  </ul>
               </div>
            </div>
            <div className="services__widget services__widget-two">
               <div className="sidebar__logo">
                  <Link href="/"><Image src={logo} alt="logo" /></Link>
               </div>
               <div className="sidebar__contact">
                  <h2 className="title">Logistics & Cargo <br /> for Business</h2>
                  <Link href="tle:0123456789" className="sidebar__phone"><i className="flaticon-telephone"></i>(123) 565-8901</Link>
                  <Link href="/contact" className="btn">Contact With us <InjectableSvg src="/assets/img/icon/right_arrow.svg" alt="" className="injectable" /></Link>
               </div>
               <div className="sidebar__shape" style={{ backgroundImage: `url(/assets/img/services/services_sidebar_shape.png)` }}></div>
            </div>
         </aside>
      </div>
   )
}

export default ProjectDetailsSidebar
